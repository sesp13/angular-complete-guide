import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInput?: ElementRef;
  @ViewChild('amountInput') amountInput?: ElementRef;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {}

  addIngredient(): void {
    const name: string | undefined = this.nameInput?.nativeElement?.value;
    const amount: number | undefined = this.amountInput?.nativeElement?.value;
    if (!name || !amount) return;
    this.shoppingListService.addIngredient({ name, amount });
    this.clearForm();
  }

  clearForm(): void {
    if (this.nameInput?.nativeElement?.value)
      this.nameInput.nativeElement.value = null;

    if (this.amountInput?.nativeElement?.value)
      this.amountInput.nativeElement.value = null;
  }
}
