import { Component, EventEmitter, OnInit, Output } from '@angular/core';
export type NavigationPage = 'recipes' | 'shopping';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

}
