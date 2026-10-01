import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss'
})
export class Auth {

  isLogin = true;

  loginEmail = '';
  loginPassword = '';

  signupName = '';
  signupEmail = '';
  signupPassword = '';

  loading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  showLogin(): void {
    this.isLogin = true;
    this.errorMessage = '';
  }

  showSignup(): void {
    this.isLogin = false;
    this.errorMessage = '';
  }

  async login(): Promise<void> {

    if (!this.loginEmail || !this.loginPassword) {
      this.errorMessage = 'Please enter your email and password.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const { error } = await this.authService.signIn(
      this.loginEmail,
      this.loginPassword
    );

    this.loading = false;

    if (error) {
      this.errorMessage = error.message;
      return;
    }

    // For now we'll send logged-in users to dashboard.
    // Verification routing will be added next.
    await this.router.navigate(['/dashboard']);
  }

  async signup(): Promise<void> {

    if (!this.signupName || !this.signupEmail || !this.signupPassword) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    if (this.signupPassword.length < 6) {
      this.errorMessage = 'Password must contain at least 6 characters.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const { error } = await this.authService.signUp(
      this.signupEmail,
      this.signupPassword
    );

    this.loading = false;

    if (error) {
      this.errorMessage = error.message;
      return;
    }

    // New students will go through verification.
    await this.router.navigate(['/verification']);
  }
}