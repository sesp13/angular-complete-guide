import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/models/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './/shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  private ingredientsSub?: Subscription;
  
  ingredients: Ingredient[] = [];

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.setIngredients();
    this.ingredientsSub = this.shoppingListService.ingredientsChanged.subscribe(
      () => {
        this.setIngredients();
      }
    );
  }

  ngOnDestroy(): void {
    this.ingredientsSub?.unsubscribe();
  }

  setIngredients(): void {
    this.ingredients = this.shoppingListService.ingredients;
  }
}
