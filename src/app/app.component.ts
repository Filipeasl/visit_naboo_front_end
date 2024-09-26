import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NavbarComponent } from "./elements/navbar/navbar.component";
import { FooterComponent } from "./elements/footer/footer.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'visit_naboo_front_end';

  showHeaderFooter = true;

  constructor(private router: Router) {
    this.router.events.subscribe((val) => {
      // Listen to navigation events and update the visibility of header/footer
      if (val instanceof NavigationEnd) {
        const urlTree = this.router.parseUrl(this.router.url);
        const basePath = urlTree.root.children['primary']?.segments.map(segment => segment.path).join('/');
        this.showHeaderFooter = !['login', 'signup'].includes(basePath || '');
      }
    });
  }
}
