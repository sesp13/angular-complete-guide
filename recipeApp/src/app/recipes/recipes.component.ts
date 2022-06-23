import { Component } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent {
  currentRecipe?: Recipe;

  changeDetail(recipe: Recipe) {
    this.currentRecipe = recipe;
  }
}
