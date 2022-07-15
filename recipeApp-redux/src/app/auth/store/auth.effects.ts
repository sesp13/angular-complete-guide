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
  LOGOUT,
  AUTO_LOGIN,
  Logout,
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
    localStorage.setItem('userData', JSON.stringify(user));
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

  authRedirect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AUTHENTICATE_SUCCESS, LOGOUT),
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

  authLogout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LOGOUT),
        tap(() => {
          localStorage.removeItem('userData');
        })
      ),
    {
      dispatch: false,
    }
  );

  autoLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(AUTO_LOGIN),
      map(() => {
        const data: string | null = localStorage.getItem('userData');
        if (!data) return { type: 'DUMMY' };

        const schema = JSON.parse(data);
        const user: User = new User(
          schema.email,
          schema.id,
          schema._token,
          new Date(schema._tokenExpirationDate)
        );
        if (user.token) {
          return new AuthenticateSuccess(user);
          const expirationDuration =
            new Date(schema._tokenExpirationDate).getTime() -
            new Date().getTime();
          // this.autoLogout(expirationDuration);
        } else {
          return { type: 'DUMMY' };
        }
      })
    )
  );
}
