import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Subscription, take } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { Recipe } from '../recipe.model';
import { AddRecipe, UpdateRecipe } from '../store/recipe.actions';
import { RecipeState } from '../store/recipe.reducer';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id?: number;
  isEditMode: boolean = false;
  recipeForm!: FormGroup;

  paramsSub?: Subscription;

  get ingredientsArray(): FormArray {
    return this.recipeForm.controls['ingredients'] as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.setView();
  }

  ngOnDestroy(): void {
    this.paramsSub?.unsubscribe();
  }

  private setView(): void {
    this.paramsSub = this.route.params.subscribe(({ id }) => {
      this.id = id;
      if (id) {
        this.isEditMode = true;
      } else {
        this.isEditMode = false;
      }

      this.store
        .select('recipes')
        .pipe(
          take(1),
          map((state: RecipeState) => {
            return this.id !== undefined ? state.recipes[this.id] : undefined;
          })
        )
        .subscribe((fetchedRecipe?: Recipe) => {
          this.initForm(fetchedRecipe);
        });
    });
  }

  private initForm(fetchedRecipe?: Recipe): void {
    const { name, imagePath, description, ingredients } =
      this.getEditingRecipe(fetchedRecipe);

    this.recipeForm = this.fb.group({
      name: [name, [Validators.required]],
      imagePath: [imagePath, [Validators.required]],
      description: [description, [Validators.required]],
      ingredients: this.fb.array([]),
    });

    this.setRecipeIngredients(ingredients);
  }

  getEditingRecipe(recipe?: Recipe): Recipe {
    if (recipe) {
      return recipe;
    } else {
      return {
        name: '',
        imagePath: '',
        description: '',
        ingredients: [],
      };
    }
  }

  setRecipeIngredients(ingredients?: Ingredient[]): void {
    ingredients?.forEach((ingredient) => {
      this.addIngredient(ingredient.name, ingredient.amount);
    });
  }

  addIngredient(
    name: string | null = null,
    amount: number | null = null
  ): void {
    this.ingredientsArray.push(
      this.fb.group({
        name: [name, [Validators.required]],
        amount: [
          amount,
          [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)],
        ],
      })
    );
  }

  deleteIngredient(index: number): void {
    this.ingredientsArray.controls.splice(index, 1);
  }

  deleteAllIngredients(): void {
    this.ingredientsArray.clear();
  }

  onSubmit(): void {
    const recipe = this.recipeForm.value;
    if (this.isEditMode && this.id) {
      this.store.dispatch(new UpdateRecipe({ index: this.id, recipe }));
    } else {
      this.store.dispatch(new AddRecipe(recipe));
    }
  }

  onCancel(): void {
    this.router.navigate(['/recipes']);
  }
}
