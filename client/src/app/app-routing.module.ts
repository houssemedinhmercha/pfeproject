import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AdminBoardComponent } from './admin-board/admin-board.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AccueilComponent } from './accueil/accueil.component';
import { GsUsersComponent } from './gs-users/gs-users.component';

const routes: Routes = [
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: 'accueil', component: AccueilComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },

  { 
    path: 'admin-board', 
    component: AdminBoardComponent,
   
  },
  { 
    path: 'gs-users', 
    component: GsUsersComponent,
    
  },

  { path: '**', redirectTo: 'accueil' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }