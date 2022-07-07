import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthModel, AuthResponse } from './models/auth.model';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/directives/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error?: string = undefined;
  authObservable?: Observable<AuthResponse>;
  @ViewChild(PlaceHolderDirective) alertHost!: PlaceHolderDirective;
  private closeSub?: Subscription;

  constructor(
    private authService: AuthService,
    private viewContainerRef: ViewContainerRef,
    private router: Router
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
      this.closeSub?.unsubscribe();
  }

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) return;
    this.isLoading = true;

    if (this.isLoginMode) {
      this.authObservable = this.authService.login(form.value);
    } else {
      this.authObservable = this.authService.signUp(form.value);
    }

    this.authObservable.subscribe({
      next: (response) => {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      error: (errorMessage) => {
        this.isLoading = false;
        this.error = errorMessage;
        this.showErrorAlert(this.error ?? '');
      },
    });

    form.reset();
  }

  onHandleError(): void {
    this.error = undefined;
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
