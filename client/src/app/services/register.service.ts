import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = 'http://localhost:7501/auth/Inscription';

  constructor(private http: HttpClient) {}

  registerUser(userData: any, file: File): Observable<any> {
  const formData: FormData = new FormData();

  formData.append('nom', userData.nom);
  formData.append('prenom', userData.prenom);
  formData.append('email', userData.email);
  formData.append('password', userData.password);
  formData.append('adresse', userData.adresse);
  formData.append('phone', userData.phone);
  formData.append('typeUtilisateur', userData.typeUtilisateur); // ✅ ajouté

  if (file) {
    formData.append('imageprofile', file, file.name);
  } else {
    formData.append('imageprofile', ''); // ou ne rien mettre si pas obligatoire
  }

  return this.http.post(this.apiUrl, formData).pipe(
    catchError((error) => {
      console.error("Erreur lors de l'enregistrement de l'utilisateur", error);
      return throwError(() => new Error("Erreur lors de l'enregistrement de l'utilisateur."));
    })
  );
}
}
