import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private _ingredients: Ingredient[] = [];

  get ingredients(): Ingredient[] {
    return [...this._ingredients];
  }

  ingredientsChanged = new EventEmitter<void>();

  constructor() {}

  addIngredient(ingredient: Ingredient) {
    this._ingredients.push(ingredient);
    this.ingredientsChanged.emit();
  }

  addManyIngredients(ingredients: Ingredient[]) {
    this._ingredients.push(...ingredients);
    this.ingredientsChanged.emit();
  }
}
