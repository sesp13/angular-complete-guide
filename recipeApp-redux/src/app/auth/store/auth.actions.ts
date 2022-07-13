import { Action } from '@ngrx/store';
import { User } from '../models/user.model';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export class Login implements Action {
  readonly type: string = LOGIN;
  constructor(public payload: User) {}
}

export class Logout implements Action {
  readonly type: string = LOGOUT;
  payload = null;
}