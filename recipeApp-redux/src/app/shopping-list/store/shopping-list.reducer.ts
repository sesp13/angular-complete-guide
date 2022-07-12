import { Ingredient } from 'src/app/shared/models/ingredient.model';
import {
  ADD_INGREDIENT,
  ADD_INGREDIENTS,
  DELETE_INGREDIENT,
  START_EDIT,
  STOP_EDIT,
  UPDATE_INGREDIENT,
} from './shopping-list.actions';

export interface ShoppingState {
  ingredients: Ingredient[];
  editedIngredient: Ingredient | null;
  editedIngredientIndex: number;
}

export interface AppState {
  shoppingList: ShoppingState;
}

const initialState: ShoppingState = {
  ingredients: [
    { name: 'Apple', amount: 50 },
    { name: 'Bread', amount: 10 },
    { name: 'Tomato', amount: 4 },
    { name: 'Juice', amount: 45 },
  ],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export function shoppingListReducer(
  state: ShoppingState = initialState,
  action: any
): ShoppingState {
  switch (action.type) {
    case ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    }
    case ADD_INGREDIENTS: {
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };
    }
    case UPDATE_INGREDIENT: {
      const payload = action.payload;
      const oldIngredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = { ...oldIngredient, ...payload };
      const newIngredients = [...state.ingredients];
      newIngredients[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: newIngredients,
        editedIngredientIndex: -1,
        editedIngredient: null,
      };
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (value, index) => index !== state.editedIngredientIndex
        ),
        editedIngredientIndex: -1,
        editedIngredient: null,
      };
    }
    case START_EDIT: {
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: { ...state.ingredients[action.payload] },
      };
    }
    case STOP_EDIT: {
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1,
      };
    }
    default:
      return state;
  }
}
