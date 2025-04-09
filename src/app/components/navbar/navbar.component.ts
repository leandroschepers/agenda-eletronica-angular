import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [RouterModule, CommonModule],
  standalone: true,
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isAuthenticated = false;

  constructor(private router: Router) {}

  logout() {
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }
}