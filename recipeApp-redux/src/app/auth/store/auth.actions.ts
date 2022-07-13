import { User } from '../models/user.model';

export interface AuthState {
  user: User | null;
}
const initialState: AuthState = {
  user: null,
};

export function authReducer(state: AuthState = initialState, action: any) {
  return state;
}
