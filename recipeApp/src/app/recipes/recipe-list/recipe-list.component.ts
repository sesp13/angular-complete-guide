import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    {
      name: 'A test recipe',
      description: 'This is simple a test',
      imagePath:
        'https://www.cookingclassy.com/wp-content/uploads/2022/05/bolognese-2.jpg',
    },
    {
      name: 'A test recipe',
      description: 'This is simple a test',
      imagePath:
        'https://www.cookingclassy.com/wp-content/uploads/2022/05/bolognese-2.jpg',
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
