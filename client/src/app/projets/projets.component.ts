import { Component, OnInit } from '@angular/core';
import { ProjetService } from '../services/projet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projets',
  templateUrl: './projets.component.html',
  styleUrls: ['./projets.component.css']
})
export class ProjetsComponent implements OnInit {
  projets: any[] = [];
  errorMessage: string = '';
  isModalOpen: boolean = false;
  projetEnCours: any = {};

  constructor(private projetService: ProjetService, private router: Router) {}

  ngOnInit(): void {
    this.loadProjets();
  }

  // Charger tous les projets
  loadProjets(): void {
    this.projetService.obtenirProjetsUtilisateur().subscribe(
      (data) => {
        this.projets = data;
      },
      (error) => {
        console.error('Erreur backend:', error);
      }
    );
  }

  // Ouvrir le modal avec les données du projet
  ouvrirModal(projet: any): void {
    this.projetEnCours = { ...projet };
    this.isModalOpen = true;
  }

  // Fermer le modal
  fermerModal(): void {
    this.isModalOpen = false;
    this.projetEnCours = {};
  }

  // Soumettre la modification du projet
  soumettreModification(): void {
    if (!this.projetEnCours || !this.projetEnCours._id) {
      this.errorMessage = 'Projet invalide pour modification.';
      return;
    }

    this.projetService.modifierProjet(this.projetEnCours._id, this.projetEnCours).subscribe(
      () => {
        this.loadProjets();
        this.fermerModal();
        alert('Projet modifié avec succès.');
      },
      (error) => {
        this.errorMessage = 'Erreur lors de la modification du projet.';
        console.error('Erreur:', error);
      }
    );
  }

  // Supprimer un projet
  supprimerProjet(projetId: string): void {
    if (!projetId) {
      this.errorMessage = 'ID de projet invalide pour suppression.';
      console.error('ID de projet invalide:', projetId);
      return;
    }

    const confirmation = window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?');
    if (!confirmation) {
      return;
    }

    this.projetService.supprimerProjet(projetId).subscribe(
      () => {
        this.loadProjets();
        alert('Le projet a été supprimé avec succès.');
      },
      (error) => {
        this.errorMessage = 'Erreur lors de la suppression du projet.';
        console.error('Erreur lors de la suppression du projet:', error);
      }
    );
  }
}
