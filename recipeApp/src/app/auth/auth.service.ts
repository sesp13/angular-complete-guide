import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthModel, AuthResponse } from './auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(model: AuthModel): Observable<AuthResponse> {
    const body = { ...model, returnSecureToken: true };
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp';
    const params = new HttpParams().set(
      'key',
      environment.firebaseKey
    );
    return this.http.post<AuthResponse>(url, body, { params });
  }
}
