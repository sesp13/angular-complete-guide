import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthModel, AuthResponse } from './auth.model';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error?: string = undefined;
  authObservable?: Observable<AuthResponse>;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

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
        console.log(response);
      },
      error: (errorMessage) => {
        this.isLoading = false;
        this.error = errorMessage;
      },
    });

    form.reset();
  }
}
