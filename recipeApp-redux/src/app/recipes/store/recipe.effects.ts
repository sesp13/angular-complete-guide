import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { Recipe } from '../recipe.model';
import { FETCH_RECIPES, SetRecipes, STORE_RECIPES } from './recipe.actions';
import { RecipeState } from './recipe.reducer';

@Injectable()
export class RecipeEffects {
  private baseUrl: string = `https://firestore-grpah-default-rtdb.firebaseio.com`;
  private recipesUrl = `${this.baseUrl}/recipes.json`;

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<AppState>
  ) {}

  fetchRecipes = createEffect(() =>
    this.actions$.pipe(
      ofType(FETCH_RECIPES),
      switchMap(() => this.http.get<Recipe[]>(this.recipesUrl)),
      map((recipes) => {
        return recipes.map((recipe) => {
          if (!recipe.ingredients) {
            recipe.ingredients = [];
          }
          return { ...recipe };
        });
      }),
      map((recipes: Recipe[]) => new SetRecipes(recipes))
    )
  );

  storeRecipes = createEffect(
    () =>
      this.actions$.pipe(
        ofType(STORE_RECIPES),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([actionData, recipesState]) => {
          return this.http.put(this.recipesUrl, recipesState.recipes);
        })
      ),
    { dispatch: false }
  );
}
