import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from './models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.userSubject.pipe(
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
