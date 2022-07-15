import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/models/user.model';
import { Logout } from '../auth/store/auth.actions';
import { AuthState } from '../auth/store/auth.reducer';
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
    private dataService: DataStorageService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.userSub = this.store
      .select('auth')
      .pipe(map((state: AuthState) => state.user))
      .subscribe((user: User | null) => {
        this.isAuthenticated = !user ? false : true;
      });
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

  onLogout(): void {
    this.store.dispatch(new Logout());
  }
}
