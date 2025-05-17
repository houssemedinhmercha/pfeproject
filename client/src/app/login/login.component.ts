import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';  // Service d'authentification

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService // Injection du service d'authentification
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  handleLogin(): void {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.error = null;

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (response) => {
        console.log('Réponse du backend:', response);  // Log pour la réponse complète

        this.isLoading = false;

        const token = response.token;
        const role = response.user?.role;

        console.log('Role récupéré:', role);  // Vérifie si le rôle est "investisseur"

        if (!token || !role) {
          console.error('Token ou rôle manquant.');
          this.error = 'Réponse invalide du serveur.';
          return;
        }

        this.authService.saveToken(token);

        // Redirection selon le rôle
        switch (role) {
          case 'Admin':
            this.router.navigate(['/admin-board']);
            break;
          case 'investisseur':
            this.router.navigate(['/investisseur-page']);
            break;
          case 'porteurprojet':
            this.router.navigate(['/porteur-projet-page']);
            break;
          default:
            console.error('Rôle inconnu:', role);
            this.router.navigate(['/accueil']);
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.error = 'Email ou mot de passe incorrect.';
        console.error('Erreur lors de la connexion :', err);
      }
    });
  }
}
