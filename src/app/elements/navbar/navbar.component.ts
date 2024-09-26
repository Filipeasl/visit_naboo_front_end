import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isMenuOpen = false;
  isAuthenticated = false;

  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    // Check if the user is authenticated when the component initializes
    this.isAuthenticated = await this.authService.isAuthenticated();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  async logout(): Promise<void> {
    try {
      // Call the logout method from AuthService
      await this.authService.logout();
      
      // Navigate to the login page
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }
}
