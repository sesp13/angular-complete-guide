import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataStorageService } from '../shared/services/data-storage.service';
export type NavigationPage = 'recipes' | 'shopping';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private dataService: DataStorageService) {}

  ngOnInit(): void {}

  onSaveData(): void {
    this.dataService.storeRecipes().subscribe();
  }

  onFecthData(): void {
    this.dataService.fetchRecipes().subscribe();
  }
}
