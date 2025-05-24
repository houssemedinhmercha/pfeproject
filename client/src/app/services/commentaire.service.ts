import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { AuthService } from './auth.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {
  private apiUrl = 'http://localhost:7501/commentaire'; // Assure-toi que ton backend utilise bien ce préfixe

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    });
  }

  /**
   * 🔍 Récupère un projet par son numéro (numProjet)
   */
  getProjetByNumero(numProjet: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${numProjet}`, {
      headers: this.getHeaders()
    }).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération du projet:', error);
        return throwError(() => new Error('Impossible de récupérer le projet'));
      })
    );
  }

  /**
   * 📝 Ajoute un commentaire à un projet (projetId, contenu, note)
   */
  ajouterCommentaire(commentaireData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add-commentaire`, commentaireData, {
      headers: this.getHeaders()
    }).pipe(
      catchError(error => {
        console.error('Erreur lors de l\'ajout du commentaire:', error);
        return throwError(() => new Error('Impossible d\'ajouter le commentaire'));
      })
    );
  }
}
