import { Action } from '@ngrx/store';
import { User } from '../models/user.model';

export const LOGIN = '[Auth] LOGIN';
export const LOGOUT = '[Auth] LOGOUT';
export const LOGIN_START = '[Auth] LGIN_START';

export class Login implements Action {
  readonly type: string = LOGIN;
  constructor(public payload: User) {}
}

export class LoginStart implements Action {
  readonly type: string = LOGIN_START;
  constructor(public payload: { email: string; password: string }) {}
}
export class Logout implements Action {
  readonly type: string = LOGOUT;
  payload = null;
}
