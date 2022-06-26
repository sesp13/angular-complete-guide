import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  
  recipeSelected = new EventEmitter<Recipe>();
  
  private recipes: Recipe[] = [
    {
      name: 'A test recipe',
      description: 'This is simple a test',
      imagePath:
        'https://www.cookingclassy.com/wp-content/uploads/2022/05/bolognese-2.jpg',
    },
    {
      name: 'Another test recipe',
      description: 'This is simple a test',
      imagePath:
        'https://www.cookingclassy.com/wp-content/uploads/2022/05/bolognese-2.jpg',
    },
  ];


  getRecipes(): Recipe[] {
    return [...this.recipes];
  }
}
