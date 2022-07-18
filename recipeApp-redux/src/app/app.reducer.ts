import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from './auth/store/auth.reducer';
import { recipeReducer, RecipeState } from './recipes/store/recipe.reducer';
import {
  shoppingListReducer,
  ShoppingState,
} from './shopping-list/store/shopping-list.reducer';

export interface AppState {
  shoppingList: ShoppingState;
  auth: AuthState;
  recipes: RecipeState
}

export const AppReducer: ActionReducerMap<AppState> = {
  shoppingList: shoppingListReducer,
  auth: authReducer,
  recipes: recipeReducer
};
