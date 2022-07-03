import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  recipesSub?: Subscription;

  constructor(private recipeService: RecipeService, private router: Router) {}

  ngOnInit(): void {
    this.setRecipes();
    this.recipesSub = this.recipeService.onRecipesChanged.subscribe(() =>
      this.setRecipes()
    );
  }

  ngOnDestroy(): void {
    this.recipesSub?.unsubscribe();
  }

  setRecipes(): void {
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe(): void {
    this.router.navigate(['/recipes/new']);
  }
}
