import { Component, OnInit } from '@angular/core';
import { CommentaireService } from '../services/commentaire.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-commentaire',
  templateUrl: './commentaire.component.html',
  styleUrls: ['./commentaire.component.css']
})
export class CommentaireComponent implements OnInit {
  numProjet: string = '';
  projet: any = null;
  showForm: boolean = false;
  errorMessage: string = '';
  commentaireData = { contenu: '', note: 5 }; // Remplace par la structure attendue
  commentaireAdded: boolean = false;

  constructor(
    private commentaireService: CommentaireService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  onSearchProjet(): void {
    this.commentaireService.getProjetByNumero(this.numProjet).subscribe(
      (data) => {
        this.projet = data;
        this.showForm = true; // Affiche le formulaire
        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage = 'Projet non trouvé.';
        this.projet = null;
        this.showForm = false; // Masque le formulaire
      }
    );
  }

  onAjouterCommentaire(): void {
    const commentaireData = {
      projetId: this.projet._id,
      contenu: this.commentaireData.contenu,
      note: this.commentaireData.note
    };

    this.commentaireService.ajouterCommentaire(commentaireData).subscribe(
      (response) => {
        this.commentaireAdded = true;
        this.errorMessage = '';
        this.commentaireData.contenu = '';
        this.commentaireData.note = 5;
        // Optionnel: Redirige vers la page du projet
        setTimeout(() => {
          // Redirection vers la page du projet
        }, 2000);
      },
      (error) => {
        this.errorMessage = 'Erreur lors de l\'ajout du commentaire.';
      }
    );
  }
}
