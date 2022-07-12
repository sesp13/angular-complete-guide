import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  isEditMode: boolean = false;
  editIndex?: number;
  editItem?: Ingredient;

  @ViewChild('shoppingForm') shoppingForm!: NgForm;

  editSub?: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.enableEditMode();
  }

  ngOnDestroy(): void {
    this.editSub?.unsubscribe();
  }

  enableEditMode(): void {
    this.editSub = this.shoppingListService.startedEditing.subscribe(
      (index: number) => this.setEditForm(index)
    );
  }

  setEditForm(index: number): void {
    this.isEditMode = true;
    this.editIndex = index;
    this.editItem = this.shoppingListService.getIngredient(this.editIndex);
    this.shoppingForm.setValue({
      name: this.editItem.name,
      amount: this.editItem.amount,
    });
  }

  onSubmitForm(): void {
    const value = this.shoppingForm.value;
    const ingredient = {
      name: value.name,
      amount: value.amount,
    };

    if (this.isEditMode) {
      if (this.editIndex !== undefined)
        this.shoppingListService.updateIngredient(this.editIndex, ingredient);
    } else {
      this.shoppingListService.addIngredient(ingredient);
    }

    this.clearForm();
  }

  clearForm(): void {
    this.isEditMode = false;
    this.shoppingForm.reset();
  }

  onDeleteIngredient(): void {
    if (this.editIndex !== undefined)
      this.shoppingListService.deleteIngredient(this.editIndex);
    this.clearForm();
  }
}
