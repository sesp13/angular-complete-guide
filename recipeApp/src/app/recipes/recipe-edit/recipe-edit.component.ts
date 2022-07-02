import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
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

  get ingredientsControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
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
    let name: string | undefined = '';
    let imagePath: string | undefined = '';
    let description: string | undefined = '';
    let ingredients = new FormArray([]);

    if (this.isEditMode && this.id) {
      const recipe = this.recipeService.getRecipeById(this.id);
      name = recipe?.name;
      imagePath = recipe?.imagePath;
      description = recipe?.description;
      if (recipe?.ingredients) {
        recipe.ingredients.forEach((ingredient) => {
          ingredients.push(
            this.fb.group({
              name: [ingredient.name],
              amount: [ingredient.amount],
            })
          );
        });
      }
    }

    this.recipeForm = this.fb.group({
      name: [name],
      imagePath: [imagePath],
      description: [description],
      ingredients,
    });

    console.log(this.ingredientsControls);
  }

  onSubmit(): void {
    console.log(this.recipeForm);
  }
}
