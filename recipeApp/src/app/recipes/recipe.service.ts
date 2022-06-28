import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    {
      id: '1',
      name: 'Tasty Schitzel',
      description: 'This is just awesome',
      imagePath: 'https://cdn7.kiwilimon.com/recetaimagen/860/12668.jpg',
      ingredients: [
        { name: 'Meat', amount: 1 },
        { name: 'French Fries', amount: 20 },
      ],
    },
    {
      id: '2',
      name: 'Big Fat Burger',
      description: 'What else you need to say?',
      imagePath:
        'https://cdn-cmjom.nitrocdn.com/FpMsHpAgoVrRMnuAdmBhGkyiizdsWlSU/assets/static/optimized/rev-baa58a1/wp-content/uploads/2015/07/king-burger-541x633.png',
      ingredients: [
        { name: 'Buns', amount: 2 },
        { name: 'Meat', amount: 1 },
      ],
    },
  ];

  getRecipes(): Recipe[] {
    return [...this.recipes];
  }

  getRecipeById(id: string): Recipe | undefined {
    const recipeFound = this.recipes.find((recipe) => recipe.id == id);
    if (recipeFound) {
      return { ...recipeFound };
    } else {
      return undefined;
    }
  }
}
