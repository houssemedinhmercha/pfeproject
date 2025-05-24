import { Component, OnInit } from '@angular/core';
import { ProjetService } from '../services/projet.service';  // Importer le service Projet
import { Router } from '@angular/router';  // Pour la redirection après ajout

@Component({
  selector: 'app-ajouter-projet',
  templateUrl: './ajouter-projet.component.html',
  styleUrls: ['./ajouter-projet.component.css']
})
export class AjouterProjetComponent implements OnInit {
  projet = {
    numProjet: '',
    titre: '',
    description: '',
    categorie: '',
    montant_requis: null,
    date_debut: '',
    date_fin: ''
  };

  // Variable pour gérer l'affichage des erreurs ou du succès
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private projetService: ProjetService, private router: Router) {}

  ngOnInit(): void {}

  // Méthode pour soumettre le formulaire
  onSubmit(): void {
    this.projetService.creerProjet(this.projet).subscribe(
      (response) => {
        // En cas de succès
        this.successMessage = 'Le projet a été créé avec succès!';
        this.errorMessage = '';
        // Vous pouvez rediriger l'utilisateur après une création réussie
        setTimeout(() => {
          this.router.navigate(['/projets']);  // Redirige vers la page des projets (adaptez la route)
        }, 2000);
      },
      (error) => {
        // En cas d'erreur
        this.errorMessage = 'Erreur lors de la création du projet. Veuillez réessayer.';
        this.successMessage = '';
        console.error('Erreur', error);
      }
    );
  }
}
