import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordResetService } from '../services/password-reset.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  isLoading = false;
  error: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private passwordResetService: PasswordResetService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  sendPasswordResetLink(): void {
    if (this.forgotPasswordForm.invalid) return;

    this.isLoading = true;
    const email = this.forgotPasswordForm.value.email;

    this.passwordResetService.requestPasswordReset(email).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.successMessage = 'Un email de réinitialisation a été envoyé.';
        this.error = '';
      },
      error: (err) => {
        this.isLoading = false;
        this.error = 'Une erreur est survenue. Veuillez réessayer.';
        this.successMessage = '';
      }
    });
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']); // ou '/auth/login' selon tes routes
  }
}
