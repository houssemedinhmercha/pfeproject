import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.css']
})
export class AdminBoardComponent {
  constructor(private router: Router) {}
  
  // Add the missing methods that are referenced in the template
  openProfile(): void {
    // Implementation for opening the profile page
    this.router.navigate(['/admin/profile']);
  }
  
  logout(): void {
    // Implementation for logging out
    // You might want to call an authentication service here
    console.log('Logging out...');
    // Example: this.authService.logout();
    this.router.navigate(['/login']);
  }
}