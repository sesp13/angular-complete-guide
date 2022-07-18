import { Recipe } from '../recipe.model';
import {
  ADD_RECIPE,
  DELETE_RECIPE,
  SET_RECIPES,
  UPDATE_RECIPE,
} from './recipe.actions';

export interface RecipeState {
  recipes: Recipe[];
}

const initialState: RecipeState = {
  recipes: [],
};

export function recipeReducer(state: RecipeState = initialState, action: any) {
  switch (action.type) {
    case SET_RECIPES: {
      return { ...state, recipes: [...action.payload] };
    }
    case ADD_RECIPE: {
      return { ...state, recipes: [...state.recipes, action.payload] };
    }
    case UPDATE_RECIPE: {
      const newRecipe = {
        ...state.recipes[action.payload.index],
        ...action.payload.recipe,
      };
      const updatedRecipes = [...state.recipes];
      updatedRecipes[action.payload.index] = newRecipe;
      return {
        ...state,
        recipes: updatedRecipes,
      };
    }
    case DELETE_RECIPE: {
      const stuff = {
        ...state,
        recipes: state.recipes.filter(
          (recipe, index) => index !== +action.payload
        ),
      };
      return stuff;
    }
    default:
      return state;
  }
}
