import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {
  private apiUrl = 'http://localhost:7501/password'; 

  constructor(private http: HttpClient) {}

  requestPasswordReset(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/request-password-reset`, { email }).pipe(
      catchError(this.handleError)
    );
  }

  validateToken(token: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/reset-password/${token}`).pipe(
      catchError(this.handleError)
    );
  }

  resetPassword(token: string, newPassword: string, confirmPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password/${token}`, { newPassword, confirmPassword }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<any> {
    console.error('Erreur dans le service de réinitialisation du mot de passe :', error);
    return throwError(() => error); 
  }
}
