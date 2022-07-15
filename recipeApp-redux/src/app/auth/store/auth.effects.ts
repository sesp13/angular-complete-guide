import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../models/auth.model';
import { User } from '../models/user.model';
import {
  LOGIN,
  Login,
  LoginFail,
  LoginStart,
  LOGIN_START,
} from './auth.actions';
@Injectable()
export class AuthEffects {
  authLogin$ = createEffect(() =>
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
            map((responseData: AuthResponse) => {
              const expirationDate = new Date(
                new Date().getTime() + +responseData.expiresIn * 1000
              );
              const user = new User(
                responseData.email,
                responseData.localId,
                responseData.idToken,
                expirationDate
              );
              return new Login(user);
            }),
            catchError((errorResponse) => {
              let errorMessage = 'An error occured!';
              if (!errorResponse.error || !errorResponse.error.error) {
                return of(new LoginFail(errorMessage));
                return of(new LoginFail(errorMessage));
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
              return of(new LoginFail(errorMessage));
            })
          );
      })
    )
  );

  authSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LOGIN),
        tap(() => {
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}
}
