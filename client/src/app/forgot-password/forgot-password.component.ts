// forgot-password.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  isLoading = false;
  error: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  sendPasswordResetLink() {
    if (this.forgotPasswordForm.invalid) return;
  
    this.isLoading = true;
    this.error = null;
    this.successMessage = null;
  
    // Simulate sending reset link (replace with actual implementation)
    setTimeout(() => {
      this.isLoading = false;
      this.successMessage = "Password reset link sent! Please check your email.";
      this.forgotPasswordForm.reset();
      
      // Auto-navigate after 5 seconds
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 5000);
    }, 1000);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
