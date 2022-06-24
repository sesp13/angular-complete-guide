import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Ingredient } from 'src/app/shared/models/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInput?: ElementRef;
  @ViewChild('amountInput') amountInput?: ElementRef;

  @Output() onAddItem = new EventEmitter<Ingredient>();

  constructor() {}

  ngOnInit(): void {}

  addIngredient(): void {
    const name: string | undefined = this.nameInput?.nativeElement?.value;
    const amount: number | undefined = this.amountInput?.nativeElement?.value;
    if (!name || !amount) return;
    this.onAddItem.emit({ name, amount });
    this.clearForm();
  }

  clearForm(): void {
    if (this.nameInput?.nativeElement?.value)
      this.nameInput.nativeElement.value = null;

    if (this.amountInput?.nativeElement?.value)
      this.amountInput.nativeElement.value = null;
  }
}
