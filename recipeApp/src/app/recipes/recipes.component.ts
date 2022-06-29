import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit, OnDestroy {
  currentRecipe?: Recipe;
  recipeSub?: Subscription;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.recipeSub?.unsubscribe();
  }
}
