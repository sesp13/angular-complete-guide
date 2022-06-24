import { Component } from '@angular/core';
import { Ingredient } from '../shared/models/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './/shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent {
  ingredients: Ingredient[] = [
    {
      name: 'Apples',
      amount: 5,
    },
    {
      name: 'Tommatos',
      amount: 10,
    },
  ];

  constructor() {}

  addItem(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }
}
