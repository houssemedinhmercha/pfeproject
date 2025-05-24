import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';  // Import de HttpClientModule
import { FormsModule } from '@angular/forms';  // Importer FormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AdminBoardComponent } from './admin-board/admin-board.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InvestisseurPageComponent } from './investisseur-page/investisseur-page.component';
import { PorteurProjetPageComponent } from './porteur-projet-page/porteur-projet-page.component';

import { AuthService } from './services/auth.service';
import { NewPasswordComponent } from './new-password/new-password.component';
import { AjouterProjetComponent } from './ajouter-projet/ajouter-projet.component';
import { ProjetsComponent } from './projets/projets.component';
import { ListeTousProjetsComponent } from './liste-tous-projets/liste-tous-projets.component';
import { CommentaireComponent } from './commentaire/commentaire.component';
import { AjouterContratComponent } from './ajouter-contrat/ajouter-contrat.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    AdminBoardComponent,
    ForgotPasswordComponent,
    AccueilComponent,
    NavbarComponent,
    InvestisseurPageComponent,
    PorteurProjetPageComponent,
    NewPasswordComponent,
    AjouterProjetComponent,
    ProjetsComponent,
    ListeTousProjetsComponent,
    CommentaireComponent,
    AjouterContratComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,  // Ajout de FormsModule ici
    HttpClientModule  // Ajout de HttpClientModule pour les appels HTTP
  ],
  providers: [AuthService],  // Optionnel si AuthService n'est pas déjà fourni via 'root'
  bootstrap: [AppComponent]
})
export class AppModule { }
