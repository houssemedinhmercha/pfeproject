import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContratService {
  private baseUrl = 'http://localhost:7501/contrat';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // ou ton autre méthode
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  createContrat(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/ajouterContrat`, data, {
      headers: this.getAuthHeaders()
    });
  }

  getProjets(): Observable<any> {
    return this.http.get(`${this.baseUrl}/projets`, {
      headers: this.getAuthHeaders()
    });
  }

  getPdfContratsByPorteur(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Pdfs`, {
      headers: this.getAuthHeaders()
    });
  }
}
