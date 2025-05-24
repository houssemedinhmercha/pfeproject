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
    this.projetService.getTousLesProjets().subscribe(
      (data) => {
        if (Array.isArray(data)) {
          this.projets = data;
        } else {
          this.errorMessage = 'Données incorrectes reçues du serveur.';
          console.error('Données incorrectes:', data);
        }
      },
      (error) => {
        this.errorMessage = 'Erreur lors du chargement des projets.';
        console.error('Erreur API:', error);
      }
    );
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
  changerStatut(projetId: string, nouveauStatut: string): void {
  this.projetService.modifierProjet(projetId, { statut: nouveauStatut }).subscribe(
    () => {
      // Mettre à jour localement après succès
      const projet = this.projets.find(p => p._id === projetId);
      if (projet) {
        projet.statut = nouveauStatut;
      }
    },
    (error) => {
      console.error('Erreur lors du changement de statut:', error);
    }
  );
  }}
