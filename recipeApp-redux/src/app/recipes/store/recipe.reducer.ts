import { Recipe } from '../recipe.model';
import { SET_RECIPES } from './recipe.actions';

export interface RecipeState {
  recipes: Recipe[];
}

const initialState: RecipeState = {
  recipes: [],
};

export function recipeReducer(state: RecipeState = initialState, action: any) {
  switch (action.type) {
    case SET_RECIPES:
      return { ...state, recipes: [...action.payload] };
    default:
      return state;
  }
}
