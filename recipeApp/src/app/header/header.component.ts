import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/models/user.model';
import { DataStorageService } from '../shared/services/data-storage.service';
export type NavigationPage = 'recipes' | 'shopping';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  userSub?: Subscription;

  constructor(
    private authService: AuthService,
    private dataService: DataStorageService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.userSubject.subscribe(
      (user: User | null) => {
        this.isAuthenticated = !user ? false : true;
      }
    );
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }

  onSaveData(): void {
    this.dataService.storeRecipes().subscribe();
  }

  onFecthData(): void {
    this.dataService.fetchRecipes().subscribe();
  }
}
