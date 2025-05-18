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

  { path: '**', redirectTo: 'accueil' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
