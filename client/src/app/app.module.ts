import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';  // Import de HttpClientModule

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
import { NewPasswordComponent } from './new-password/new-password.component';  // Import du service AuthService

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule  // Ajout de HttpClientModule pour les appels HTTP
  ],
  providers: [AuthService],  // Optionnel si AuthService n'est pas déjà fourni via 'root'
  bootstrap: [AppComponent]
})
export class AppModule { }
