import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Subscription, switchMap } from 'rxjs';
import { AddIngredients } from 'src/app/shopping-list/store/shopping-list.actions';
import { Recipe } from '../recipe.model';
import { AppState } from 'src/app/app.reducer';
import { RecipeState } from '../store/recipe.reducer';
import { DeleteRecipe } from '../store/recipe.actions';

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
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.paramSub = this.route.params
      .pipe(
        map((params: Params) => params['id']),
        switchMap((id: number) => {
          this.recipeId = id;
          return this.store.select('recipes');
        }),
        map((state: RecipeState) =>
          state.recipes.find((recipe, index) => index == this.recipeId)
        )
      )
      .subscribe((recipe?: Recipe) => {
        this.recipe = recipe;
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
    if (this.recipeId) this.store.dispatch(new DeleteRecipe(this.recipeId));
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
