import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from './auth/store/auth.reducer';
import {
  shoppingListReducer,
  ShoppingState,
} from './shopping-list/store/shopping-list.reducer';

export interface AppState {
  shoppingList: ShoppingState;
  auth: AuthState;
}

export const AppReducer: ActionReducerMap<AppState> = {
  shoppingList: shoppingListReducer,
  auth: authReducer,
};
