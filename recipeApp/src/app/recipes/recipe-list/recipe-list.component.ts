import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  @Output() onSelectRecipe = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    {
      name: 'A test recipe',
      description: 'This is simple a test',
      imagePath:
        'https://www.cookingclassy.com/wp-content/uploads/2022/05/bolognese-2.jpg',
    },
    {
      name: 'Another test recipe',
      description: 'This is simple a test',
      imagePath:
        'https://www.cookingclassy.com/wp-content/uploads/2022/05/bolognese-2.jpg',
    },
  ];
  constructor() {}

  ngOnInit(): void {}

  selectRecipe(recipeItem: Recipe) {
    this.onSelectRecipe.emit(recipeItem);
  }
}
