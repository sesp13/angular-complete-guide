import { Ingredient } from "../shared/models/ingredient.model";

export interface Recipe {
  name?: string;
  description?: string;
  imagePath?: string;
  ingredients?: Ingredient[];
}