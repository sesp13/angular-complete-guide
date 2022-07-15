import { Action } from '@ngrx/store';
import { User } from '../models/user.model';

export interface AuthModel {
  email: string;
  password: string;
}

export const AUTHENTICATE_SUCCESS = '[Auth] AUTHENTICATE_SUCCESS';
export const AUTHENTICATE_ERROR = '[Auth] AUTHENTICATE_ERROR';
export const LOGIN_START = '[Auth] LOGIN_START';
export const LOGOUT = '[Auth] LOGOUT';
export const SINGUP_START = '[Auth] SINGUP_START';

export class AuthenticateSuccess implements Action {
  readonly type: string = AUTHENTICATE_SUCCESS;
  constructor(public payload: User) {}
}

export class AuthenticateError implements Action {
  readonly type: string = AUTHENTICATE_ERROR;
  constructor(public payload: string) {}
}

export class LoginStart implements Action {
  readonly type: string = LOGIN_START;
  constructor(public payload: AuthModel) {}
}

export class Logout implements Action {
  readonly type: string = LOGOUT;
  payload = null;
}
export class SignupStart implements Action {
  readonly type: string = SINGUP_START;
  constructor(public payload: AuthModel) {}
}
