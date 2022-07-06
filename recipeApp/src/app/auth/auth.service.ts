import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthModel, AuthResponse } from './models/auth.model';
import { User } from './models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  userSubject = new Subject<User>();

  constructor(private http: HttpClient) {
    console.log(this.userSubject);
  }

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
    this.userSubject.next(user);
  }
}
