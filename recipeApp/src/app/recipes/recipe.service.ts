import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipes: Recipe[] = [
    {
      name: 'Tasty Schitzel',
      description: 'This is just awesome',
      imagePath: 'https://cdn7.kiwilimon.com/recetaimagen/860/12668.jpg',
      ingredients: [
        { name: 'Meat', amount: 1 },
        { name: 'French Fries', amount: 20 },
      ],
    },
    {
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

  onRecipesChanged: Subject<void> = new Subject();

  constructor() {}

  getRecipeById(id: number): Recipe | undefined {
    const recipeFound = this.recipes[id];
    if (recipeFound) {
      return { ...recipeFound };
    } else {
      return undefined;
    }
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.onRecipesChanged.next();
  }

  updateRecipe(index: number, recipe: Recipe): void {
    this.recipes[index] = recipe;
    this.onRecipesChanged.next();
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.onRecipesChanged.next();
  }
}
