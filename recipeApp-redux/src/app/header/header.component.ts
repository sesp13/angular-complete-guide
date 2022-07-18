import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { User } from '../auth/models/user.model';
import { Logout } from '../auth/store/auth.actions';
import { AuthState } from '../auth/store/auth.reducer';
import { FetchRecipes, StoreRecipes } from '../recipes/store/recipe.actions';
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
    this.store.dispatch(new StoreRecipes());
  }

  onFecthData(): void {
    this.store.dispatch(new FetchRecipes());
  }

  onLogout(): void {
    this.store.dispatch(new Logout());
  }
}
