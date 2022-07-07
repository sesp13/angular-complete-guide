import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Recipe } from 'src/app/recipes/recipe.model';
import { RecipeService } from 'src/app/recipes/recipe.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  private baseUrl: string = `https://firestore-grpah-default-rtdb.firebaseio.com`;
  private recipesUrl = `${this.baseUrl}/recipes.json`;

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService
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
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}
