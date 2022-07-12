import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/models/ingredient.model';
import { StartEdit } from './store/shopping-list.actions';
import * as fromShoppingList from './store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './/shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  private ingredientsSub?: Subscription;
  ingredients: Ingredient[] = [];

  constructor(
    private store: Store<fromShoppingList.AppState>
  ) {}

  ngOnInit(): void {
    this.ingredientsSub = this.store
      .select('shoppingList')
      .subscribe(({ ingredients }) => {
        this.ingredients = ingredients;
      });
  }

  ngOnDestroy(): void {
    this.ingredientsSub?.unsubscribe();
  }

  onEditItem(index: number): void {
    this.store.dispatch(new StartEdit(index));
  }
}
