import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/directives/placeholder.directive';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { CleanAuthError, LoginStart, SignupStart } from './store/auth.actions';
import { AuthState } from './store/auth.reducer';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error?: string | null = undefined;
  storeSub?: Subscription;
  @ViewChild(PlaceHolderDirective) alertHost!: PlaceHolderDirective;
  private closeSub?: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe((state: AuthState) => {
      this.isLoading = state.loading;
      this.error = state.authError;
      if (this.error) this.showErrorAlert(this.error);
    });
  }

  ngOnDestroy(): void {
    this.storeSub?.unsubscribe();
    this.closeSub?.unsubscribe();
  }

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) return;
    this.isLoading = true;

    if (this.isLoginMode) {
      this.store.dispatch(new LoginStart(form.value));
    } else {
      this.store.dispatch(new SignupStart(form.value));
    }

    form.reset();
  }

  onHandleError(): void {
    this.store.dispatch(new CleanAuthError());
  }

  private showErrorAlert(message: string): void {
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(AlertComponent);
    // Input
    componentRef.instance.message = message;
    // Output
    this.closeSub = componentRef.instance.onClose.subscribe(() => {
      this.closeSub?.unsubscribe();
      this.error = undefined;
      hostViewContainerRef.clear();
      componentRef.destroy();
    });
  }
}
