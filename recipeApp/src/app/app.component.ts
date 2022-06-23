import { Component } from '@angular/core';
import { NavigationPage } from './header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentPage: NavigationPage = 'recipes';
  
  navigate(page: NavigationPage){
    this.currentPage = page;
  }
}
