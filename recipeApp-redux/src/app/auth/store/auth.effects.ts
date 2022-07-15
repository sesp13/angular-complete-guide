import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../models/auth.model';
import { User } from '../models/user.model';
import {
  AUTHENTICATE_SUCCESS,
  AuthenticateSuccess,
  AuthenticateError,
  LoginStart,
  LOGIN_START,
  SINGUP_START,
  SignupStart,
} from './auth.actions';
@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}

  private handleAuthentication = (responseData: AuthResponse) => {
    const expirationDate = new Date(
      new Date().getTime() + +responseData.expiresIn * 1000
    );
    const user = new User(
      responseData.email,
      responseData.localId,
      responseData.idToken,
      expirationDate
    );
    return new AuthenticateSuccess(user);
  };

  private handleError = (errorResponse: HttpErrorResponse) => {
    let errorMessage = 'An error occured!';
    if (!errorResponse.error || !errorResponse.error.error) {
      return of(new AuthenticateError(errorMessage));
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
    return of(new AuthenticateError(errorMessage));
  };

  authLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(LOGIN_START),
      switchMap((authData: LoginStart) => {
        const { email, password } = authData.payload;
        const url =
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword';
        const params = new HttpParams().set('key', environment.firebaseKey);
        return this.http
          .post<AuthResponse>(url, { email, password }, { params })
          .pipe(
            map((data: AuthResponse) => this.handleAuthentication(data)),
            catchError((errorResponse) => this.handleError(errorResponse))
          );
      })
    )
  );

  authSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AUTHENTICATE_SUCCESS),
        tap(() => {
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  authSignUp = createEffect(() =>
    this.actions$.pipe(
      ofType(SINGUP_START),
      switchMap((action: SignupStart) => {
        const { email, password } = action.payload;
        const body = { email, password };
        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp';
        const params = new HttpParams().set('key', environment.firebaseKey);
        return this.http.post<AuthResponse>(url, body, { params }).pipe(
          map((data: AuthResponse) => this.handleAuthentication(data)),
          catchError((errorResponse) => this.handleError(errorResponse))
        );
      })
    )
  );
}
