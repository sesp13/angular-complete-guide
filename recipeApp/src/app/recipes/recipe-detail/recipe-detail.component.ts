import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

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
    private shoppingListService: ShoppingListService,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
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
    this.shoppingListService.addManyIngredients(newIngredients);
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
