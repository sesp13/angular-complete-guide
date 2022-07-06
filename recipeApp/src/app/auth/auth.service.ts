import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthModel, AuthResponse } from './auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(model: AuthModel): Observable<AuthResponse> {
    const body = { ...model, returnSecureToken: true };
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp';
    const params = new HttpParams().set('key', environment.firebaseKey);
    return this.http
      .post<AuthResponse>(url, body, { params })
      .pipe(catchError(this.handleError));
  }

  login(model: AuthModel): Observable<AuthResponse> {
    const body = { ...model, returnSecureToken: true };
    const url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword';
    const params = new HttpParams().set('key', environment.firebaseKey);
    return this.http
      .post<AuthResponse>(url, body, { params })
      .pipe(catchError(this.handleError));
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
}
