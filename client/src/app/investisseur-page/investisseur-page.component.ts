import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-investisseur-page',
  templateUrl: './investisseur-page.component.html',
  styleUrls: ['./investisseur-page.component.css']
})
export class InvestisseurPageComponent implements OnInit{
  user: any = {};
  isAddAffaireModal = false;
  isLoading = false;

  constructor(private authService: AuthService, private router :Router){};
    ngOnInit(): void {
    this.loadUserInfo();
  }

  loadUserInfo(): void {
    this.authService.getUserInfo().subscribe(
      (data) => {
        this.user = data;
        console.log('Infos utilisateur chargées :', this.user);
      },
      (error) => {
        console.error('Erreur lors du chargement des infos utilisateur :', error);
        // Optionnel : rediriger vers login si token invalide
        this.router.navigate(['/login']);
      }
    );
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
