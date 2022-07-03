import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

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
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
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

      this.initForm();
    });
  }

  private initForm(): void {
    const { name, imagePath, description, ingredients } =
      this.getEditingRecipe();

    this.recipeForm = this.fb.group({
      name: [name, [Validators.required]],
      imagePath: [imagePath, [Validators.required]],
      description: [description, [Validators.required]],
      ingredients: this.fb.array([]),
    });

    this.setRecipeIngredients(ingredients);
  }

  getEditingRecipe(): Recipe {
    const newRecipe: Recipe = {
      name: '',
      imagePath: '',
      description: '',
      ingredients: [],
    };

    if (this.isEditMode && this.id) {
      const fecthedRecipe = this.recipeService.getRecipeById(this.id);
      return fecthedRecipe !== undefined ? fecthedRecipe : newRecipe;
    } else {
      return newRecipe;
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
      this.recipeService.updateRecipe(this.id, recipe);
    } else {
      this.recipeService.addRecipe(recipe);
    }
  }

  onCancel(): void {
    this.router.navigate(['/recipes']);
  }
}
