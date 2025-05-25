import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AdminBoardComponent } from './admin-board/admin-board.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AccueilComponent } from './accueil/accueil.component';
import { GsUsersComponent } from './gs-users/gs-users.component';
import { InvestisseurPageComponent } from './investisseur-page/investisseur-page.component';
import { PorteurProjetPageComponent } from './porteur-projet-page/porteur-projet-page.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { AjouterProjetComponent } from './ajouter-projet/ajouter-projet.component';
import { ProjetsComponent } from './projets/projets.component';
import { ListeTousProjetsComponent} from './liste-tous-projets/liste-tous-projets.component';
import { CommentaireComponent } from './commentaire/commentaire.component';
import { AjouterContratComponent } from './ajouter-contrat/ajouter-contrat.component';
import { ContratPdfComponent } from './contrat-pdf/contrat-pdf.component';
import { ListeUtilisateursComponent } from './liste-utilisateurs/liste-utilisateurs.component';

const routes: Routes = [
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: 'accueil', component: AccueilComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password/:token', component: NewPasswordComponent },
  { path: 'admin-board', component: AdminBoardComponent },
  { path: 'gs-users', component: GsUsersComponent },
  { path: 'investisseur-page', component: InvestisseurPageComponent }, 
  { path: 'porteur-projet-page', component: PorteurProjetPageComponent }, 
  { path: 'ajouter-projet', component: AjouterProjetComponent },  // Route pour "Ajouter projet"
   {path:'projets', component: ProjetsComponent},
   { path: 'tous-les-projets', component: ListeTousProjetsComponent },
   {path:'commentaire', component:CommentaireComponent},
  { path: 'contrat', component: AjouterContratComponent }, // <-- route pour le formulaire
  {path:'Mes contrat',component:ContratPdfComponent},
  {path:'tous-les-utilisateus',component:ListeUtilisateursComponent},
 

  { path: '**', redirectTo: 'accueil' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
