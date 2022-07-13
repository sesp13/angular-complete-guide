import { User } from '../models/user.model';
import { LOGIN, LOGOUT } from './auth.actions';

export interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

export function authReducer(state: AuthState = initialState, action: any) {
  switch (action.type) {
    case LOGIN: {
      const { email, id, _token, _tokenExpirationDate } = action.payload;
      const user = new User(email, id, _token, _tokenExpirationDate);
      return {
        ...state,
        user,
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
