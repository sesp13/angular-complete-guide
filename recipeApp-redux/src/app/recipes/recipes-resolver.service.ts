import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, Observable, of, switchMap, take } from 'rxjs';
import { AppState } from '../app.reducer';
import { Recipe } from './recipe.model';
import { FetchRecipes, SET_RECIPES } from './store/recipe.actions';
import { RecipeState } from './store/recipe.reducer';

@Injectable({
  providedIn: 'root',
})
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(private actions$: Actions, private store: Store<AppState>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Recipe[] | Observable<Recipe[]> {
    return this.store.select('recipes').pipe(
      take(1),
      map((state: RecipeState) => {
        return state.recipes;
      }),
      switchMap((recipes: Recipe[]) => {
        if (recipes.length == 0) {
          this.store.dispatch(new FetchRecipes());
          return this.actions$.pipe(ofType(SET_RECIPES), take(1));
        } else {
          return of(recipes);
        }
      })
    );
  }
}
