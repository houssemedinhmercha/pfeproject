import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signupForm: FormGroup;
  isLoading = false;
  error: string | null = null;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private registerService: RegisterService
  ) {
    this.signupForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      adresse: ['', Validators.required],
      phone: ['', Validators.required],
      typeUtilisateur: ['', Validators.required] 

    });
  }

  handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  handleSignup() {
    if (this.signupForm.invalid) return;

    this.isLoading = true;
    this.error = null;

    this.registerService.registerUser(this.signupForm.value, this.selectedFile!).subscribe({
      next: () => {
        this.isLoading = false;
        alert('Compte créé avec succès !');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.error = err.message || "Erreur d'inscription";
        this.isLoading = false;
      }
    });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
