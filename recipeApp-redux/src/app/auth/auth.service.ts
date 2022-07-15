import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppState } from '../app.reducer';
import { AuthModel, AuthResponse } from './models/auth.model';
import { User } from './models/user.model';
import { AuthenticateSuccess, Logout } from './store/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<AppState>
  ) {}

  signUp(model: AuthModel): Observable<AuthResponse> {
    const body = { ...model, returnSecureToken: true };
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp';
    const params = new HttpParams().set('key', environment.firebaseKey);
    return this.http.post<AuthResponse>(url, body, { params }).pipe(
      catchError((error) => this.handleError(error)),
      tap((response) => this.handleAuthentication(response))
    );
  }

  login(model: AuthModel): Observable<AuthResponse> {
    const body = { ...model, returnSecureToken: true };
    const url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword';
    const params = new HttpParams().set('key', environment.firebaseKey);
    return this.http.post<AuthResponse>(url, body, { params }).pipe(
      catchError((error) => this.handleError(error)),
      tap((response) => this.handleAuthentication(response))
    );
  }

  logout(): void {
    this.store.dispatch(new Logout());
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
  }

  autoLogin(): void {
    const data: string | null = localStorage.getItem('userData');
    if (!data) return;
    const schema = JSON.parse(data);
    const user: User = new User(
      schema.email,
      schema.id,
      schema._token,
      new Date(schema._tokenExpirationDate)
    );
    if (user.token) {
      this.store.dispatch(new AuthenticateSuccess(user));
      const expirationDuration =
        new Date(schema._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(duration: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An error occured!';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(() => errorMessage);
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already!';
        break;
      case 'EMAIL_NOT_FOUND':
      case 'INVALID_PASSWORD':
        errorMessage = 'Incorrect email / password';
        break;
    }
    return throwError(() => errorMessage);
  }

  private handleAuthentication(responseData: AuthResponse) {
    const expirationDate = new Date(
      new Date().getTime() + +responseData.expiresIn * 1000
    );
    const user = new User(
      responseData.email,
      responseData.localId,
      responseData.idToken,
      expirationDate
    );
    localStorage.setItem('userData', JSON.stringify(user));
    this.autoLogout(+responseData.expiresIn * 1000);
    this.store.dispatch(new AuthenticateSuccess(user));
  }
}
