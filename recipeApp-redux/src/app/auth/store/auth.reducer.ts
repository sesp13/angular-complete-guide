import { User } from '../models/user.model';
import {
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_ERROR,
  LOGIN_START,
  LOGOUT,
} from './auth.actions';

export interface AuthState {
  user: User | null;
  authError: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  authError: null,
  loading: false,
};

export function authReducer(state: AuthState = initialState, action: any) {
  switch (action.type) {
    case AUTHENTICATE_SUCCESS: {
      const { email, id, _token, _tokenExpirationDate } = action.payload;
      const user = new User(email, id, _token, _tokenExpirationDate);
      return {
        ...state,
        authError: null,
        user,
        loading: false,
      };
    }
    case LOGIN_START: {
      return {
        ...state,
        authError: null,
        loading: true,
      };
    }
    case AUTHENTICATE_ERROR: {
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        user: null,
      };
    }
    default: {
      return state;
    }
  }
}
