import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-porteur-projet-page',
  templateUrl: './porteur-projet-page.component.html',
  styleUrls: ['./porteur-projet-page.component.css']
})
export class PorteurProjetPageComponent implements OnInit{
    user: any = {};
  isAddAffaireModal = false;
  isLoading = false;
    constructor(private authService: AuthService, private router :Router){};

  ngOnInit(): void {
  }



 logout() {
  console.log('Tentative de déconnexion...');
  this.isLoading = true;

  this.authService.logout().subscribe(
    (response) => {
      console.log('Déconnexion réussie :', response);

      this.authService.clearToken(); // Supprime le token localStorage

      setTimeout(() => {
        this.router.navigate(['/login']);  // Redirige vers la page login
        this.isLoading = false;
      }, 1000);
    },
    (error) => {
      console.error('Erreur lors de la déconnexion :', error);
      this.isLoading = false;
    }
  );
}
}
