import { Component, OnInit } from '@angular/core';
import { ProjetService } from '../services/projet.service';

@Component({
  selector: 'app-liste-tous-projets',
  templateUrl: './liste-tous-projets.component.html',
  styleUrls: ['./liste-tous-projets.component.css'],
})
export class ListeTousProjetsComponent implements OnInit {
  projets: any[] = [];
  errorMessage: string = '';
  recherche: string = '';
  statutFiltre: string = ''; 

  constructor(private projetService: ProjetService) {}

  ngOnInit(): void {
    this.chargerTousLesProjets();
  }

  chargerTousLesProjets(): void {
    this.projetService.getTousLesProjets().subscribe({
      next: (data) => {
        console.log('Projets reçus :', data); // Debug : s'assurer que _id existe
        if (Array.isArray(data)) {
          this.projets = data;
        } else {
          this.errorMessage = 'Données incorrectes reçues du serveur.';
          console.error('Données incorrectes:', data);
        }
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des projets.';
        console.error('Erreur API:', error);
      }
    });
  }

  projetsFiltres(): any[] {
    let projetsFiltrés = this.projets;

    if (this.recherche.trim()) {
      const rechercheLower = this.recherche.toLowerCase();
      projetsFiltrés = projetsFiltrés.filter(p =>
        p.titre?.toLowerCase().includes(rechercheLower) ||
        p.categorie?.toLowerCase().includes(rechercheLower) ||
        p.porteur?.prenom?.toLowerCase().includes(rechercheLower) ||
        p.porteur?.nom?.toLowerCase().includes(rechercheLower)
      );
    }

    if (this.statutFiltre) {
      projetsFiltrés = projetsFiltrés.filter(p => p.statut === this.statutFiltre);
    }

    return projetsFiltrés;
  }

  accepterProjet(id: string): void {
    console.log('ID du projet à accepter :', id); // Debug
    this.projetService.accepterProjet(id).subscribe({
      next: () => {
        this.rechargerProjets();
        this.errorMessage = ''; // Réinitialiser le message d'erreur
      },
      error: (err) => {
        console.error('Erreur acceptation projet:', err);
        this.errorMessage = "Erreur lors de l'acceptation du projet.";
      }
    });
  }

  refuserProjet(id: string): void {
    console.log('ID du projet à refuser :', id); // Debug
    this.projetService.refuserProjet(id).subscribe({
      next: () => {
        this.rechargerProjets();
        this.errorMessage = '';
      },
      error: (err) => {
        console.error('Erreur refus projet:', err);
        this.errorMessage = "Erreur lors du refus du projet.";
      }
    });
  }

  rechargerProjets(): void {
    this.chargerTousLesProjets();
  }
}
