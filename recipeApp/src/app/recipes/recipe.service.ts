import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipes: Recipe[] = [];

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

  setRecipes(recipes: Recipe[]): void {
    this.recipes = recipes;
    this.onRecipesChanged.next();
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
