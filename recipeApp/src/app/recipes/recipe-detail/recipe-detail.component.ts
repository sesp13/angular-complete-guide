import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe?: Recipe;

  constructor(private shoppingListService: ShoppingListService, private router: Router) {}

  ngOnInit(): void {}

  addIngredientsToCart(): void {
    const newIngredients = this.recipe?.ingredients ?? [];
    this.shoppingListService.addManyIngredients(newIngredients);
    this.router.navigate(['/shopping-list'])
  }
}
