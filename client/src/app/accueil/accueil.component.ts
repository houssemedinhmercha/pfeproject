import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent {
  popularProjects = [
    {
      id: 1,
      image: 'assets/homme.jpg'
    },
    {
      id: 2,
      title: '',
      image: 'assets/lompe.jpg'
    },
    {
      id: 3,
      title: '',
      image: 'assets/invs.jpg'
    }
  ];
  constructor(private router: Router) {}

navigateToAdmin() {
  this.router.navigate(['/admin']); // Use the exact path from your routes
}
  
} 

