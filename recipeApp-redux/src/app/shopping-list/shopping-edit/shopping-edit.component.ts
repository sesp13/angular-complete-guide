import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import {
  AddIngredient,
  ADD_INGREDIENT,
  deleteIngredient,
  StopEdit,
  UpdateIngredient,
} from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  isEditMode: boolean = false;
  editItem?: Ingredient | null;

  @ViewChild('shoppingForm') shoppingForm!: NgForm;

  editSub?: Subscription;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>
  ) {}

  ngOnInit(): void {
    this.enableEditMode();
  }

  ngOnDestroy(): void {
    this.editSub?.unsubscribe();
    this.store.dispatch(new StopEdit());
  }

  enableEditMode(): void {
    this.editSub = this.store
      .select('shoppingList')
      .subscribe((stateData: fromShoppingList.ShoppingState) => {
        if (stateData.editedIngredientIndex > -1) {
          this.setEditForm(stateData);
        } else {
          this.isEditMode = false;
        }
      });
  }

  setEditForm(stateData: fromShoppingList.ShoppingState): void {
    this.isEditMode = true;
    this.editItem = stateData.editedIngredient;
    this.shoppingForm.setValue({
      name: this.editItem?.name,
      amount: this.editItem?.amount,
    });
  }

  onSubmitForm(): void {
    const value = this.shoppingForm.value;
    const ingredient = {
      name: value.name,
      amount: value.amount,
    };

    if (this.isEditMode) {
      this.store.dispatch(new UpdateIngredient(ingredient));
    } else {
      this.store.dispatch(new AddIngredient(ingredient));
    }

    this.clearForm();
  }

  clearForm(): void {
    this.isEditMode = false;
    this.shoppingForm.reset();
    this.store.dispatch(new StopEdit());
  }

  onDeleteIngredient(): void {
    this.store.dispatch(new deleteIngredient());
    this.clearForm();
  }
}
