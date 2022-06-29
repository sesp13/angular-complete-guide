import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private _ingredients: Ingredient[] = [];

  get ingredients(): Ingredient[] {
    return [...this._ingredients];
  }

  ingredientsChanged = new Subject<void>();

  constructor() {}

  addIngredient(ingredient: Ingredient) {
    this._ingredients.push(ingredient);
    this.ingredientsChanged.next();
  }

  addManyIngredients(ingredients: Ingredient[]) {
    this._ingredients.push(...ingredients);
    this.ingredientsChanged.next();
  }
}
