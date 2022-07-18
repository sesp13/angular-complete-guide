import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, tap } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { Recipe } from 'src/app/recipes/recipe.model';
import { RecipeService } from 'src/app/recipes/recipe.service';
import { SetRecipes } from 'src/app/recipes/store/recipe.actions';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  private baseUrl: string = `https://firestore-grpah-default-rtdb.firebaseio.com`;
  private recipesUrl = `${this.baseUrl}/recipes.json`;

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private store: Store<AppState>
  ) {}

  storeRecipes(): Observable<any> {
    const recipes: Recipe[] = this.recipeService.getRecipes();
    return this.http.put(this.recipesUrl, recipes);
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipesUrl).pipe(
      map((recipes) => {
        return recipes.map((recipe) => {
          if (!recipe.ingredients) {
            recipe.ingredients = [];
          }
          return { ...recipe };
        });
      }),
      tap((recipes) => {
        this.store.dispatch(new SetRecipes(recipes));
      })
    );
  }
}
