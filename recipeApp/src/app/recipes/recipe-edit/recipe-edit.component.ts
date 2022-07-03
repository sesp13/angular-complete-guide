import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  id?: string;
  isEditMode: boolean = false;
  title: string = '';
  recipeForm!: FormGroup;

  paramsSub?: Subscription;

  get ingredientsArray(): FormArray {
    return this.recipeForm.controls['ingredients'] as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private route: ActivatedRoute
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
        this.title = `Edit recipe ${id}`;
      } else {
        this.isEditMode = false;
        this.title = `New Recipe`;
      }

      this.initForm();
    });
  }

  private initForm(): void {
    const { name, imagePath, description, ingredients } =
      this.getEditingRecipe();

    this.recipeForm = this.fb.group({
      name: [name],
      imagePath: [imagePath],
      description: [description],
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
      const group = this.fb.group({
        name: ingredient.name,
        amount: ingredient.amount,
      });
      this.ingredientsArray.push(group);
    });
  }

  onSubmit(): void {
    console.log(this.recipeForm);
  }
}
