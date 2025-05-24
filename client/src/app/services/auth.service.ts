import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:7501/auth/login'; // URL du backend pour l'authentification
  private logoutUrl = 'http://localhost:7501/auth/logout'; // URL de déconnexion
  private userInfoUrl = 'http://localhost:7501/auth/user-info'; 

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, password });
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  clearToken(): void {
    localStorage.removeItem('token');
  }

  logout(): Observable<any> {
    return this.http.post<any>(this.logoutUrl, {});
  }

getUserInfo(): Observable<any> {
  const token = this.getToken();
  if (token) {
    return this.http.get<any>(this.userInfoUrl, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  }

  // Utilise `throwError` de RxJS pour retourner une Observable d'erreur
  return new Observable((observer) => {
    observer.error(new Error('Token manquant'));
  });
}

}

