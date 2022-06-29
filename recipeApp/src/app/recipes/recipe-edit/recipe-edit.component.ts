import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id?: string;
  editMode: boolean = false;
  title: string = '';

  paramsSub?: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.setView();
  }
  
  setView(): void {
    this.paramsSub = this.route.params.subscribe(({ id }) => {
      this.id = id;
      if (id) {
        this.editMode = true;
        this.title = `Edit recipe ${id}`;
      } else {
        this.editMode = false;
        this.title = `New Recipe`;
      }
    });
  }

  ngOnDestroy(): void {
    this.paramsSub?.unsubscribe();
  }
}
