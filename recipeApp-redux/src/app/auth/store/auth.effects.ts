import { HttpClient, HttpParams } from '@angular/common/http';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../models/auth.model';
import { LoginStart, LOGIN_START } from './auth.actions';
export class AuthEffects {
  
  
  authLogin = createEffect(this.actions$.pipe(
    ofType(LOGIN_START),
    switchMap((authData: LoginStart) => {
      const { email, password } = authData.payload;
      const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp';
      const params = new HttpParams().set('key', environment.firebaseKey);
      return this.http.post<AuthResponse>(url, { email, password }, { params });
    })
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
