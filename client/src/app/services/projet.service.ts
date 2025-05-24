import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {
  private apiUrl = 'http://localhost:7501/projet';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    console.log('Token utilisé:', token); // Debug log
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    });
  }

  creerProjet(projet: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/ajouterProjet`, projet, {
      headers: this.getHeaders()
    });
  }

  modifierProjet(projetId: string, projet: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/modifierProjet/${projetId}`, projet, {
      headers: this.getHeaders()
    });
  }

  supprimerProjet(projetId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/supprimerProjet/${projetId}`, {
      headers: this.getHeaders()
    });
  }

  obtenirProjetsUtilisateur(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/mes-projets`, {
      headers: this.getHeaders()
    });
  }

  getTousLesProjets(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/allProjets`, {
      headers: this.getHeaders()
    });
  }

  accepterProjet(projetId: string): Observable<any> {
  return this.http.put<any>(`${this.apiUrl}/${projetId}/accepter`, {}, {
    headers: this.getHeaders()
  });
}

refuserProjet(projetId: string): Observable<any> {
  return this.http.put<any>(`${this.apiUrl}/${projetId}/refuser`, {}, {
    headers: this.getHeaders()
  });
}}

