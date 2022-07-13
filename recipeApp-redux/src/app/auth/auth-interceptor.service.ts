import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { exhaustMap, map, Observable, take } from 'rxjs';
import { AppState } from '../app.reducer';
import { AuthService } from './auth.service';
import { User } from './models/user.model';
import { AuthState } from './store/auth.reducer';

@Injectable({ providedIn: 'root' })
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(
      take(1),
      map((state: AuthState) => state.user),
      exhaustMap((user: User | null) => {
        if (user?.token) {
          const params = new HttpParams().set('auth', user.token);
          const newRequest = req.clone({ params });
          return next.handle(newRequest);
        } else {
          return next.handle(req);
        }
      })
    );
  }
}
