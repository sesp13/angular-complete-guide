import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AddIngredients } from 'src/app/shopping-list/store/shopping-list.actions';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe?: Recipe;
  recipeId?: number;

  paramSub?: Subscription;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.paramSub = this.route.params.subscribe(({ id }) => {
      this.recipeId = id;
      this.recipe = this.recipeService.getRecipeById(id);
    });
  }

  ngOnDestroy(): void {
    this.paramSub?.unsubscribe();
  }

  addIngredientsToCart(): void {
    const newIngredients = this.recipe?.ingredients ?? [];
    this.store.dispatch(new AddIngredients(newIngredients));
    this.router.navigate(['/shopping-list']);
  }

  onEditRecipe(): void {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe(): void {
    if (this.recipeId) this.recipeService.deleteRecipe(this.recipeId);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
