import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private _ingredients: Ingredient[] = [
    { name: 'Apple', amount: 50 },
    { name: 'Bread', amount: 10 },
    { name: 'Tomato', amount: 4 },
    { name: 'Juice', amount: 45 },
  ];
  get ingredients(): Ingredient[] {
    return [...this._ingredients];
  }

  // Subjects
  ingredientsChanged = new Subject<void>();
  startedEditing = new Subject<number>();

  constructor() {}

  getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this._ingredients.push(ingredient);
    this.ingredientsChanged.next();
  }

  addManyIngredients(ingredients: Ingredient[]) {
    this._ingredients.push(...ingredients);
    this.ingredientsChanged.next();
  }

  updateIngredient(index: number, ingredient: Ingredient): void {
    this._ingredients[index] = ingredient;
    this.ingredientsChanged.next();
  }
  
  deleteIngredient(index: number) {
    this._ingredients.splice(index, 1);
    this.ingredientsChanged.next();
  }
}
