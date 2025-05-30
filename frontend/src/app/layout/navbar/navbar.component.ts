import { Component, ViewChild } from '@angular/core';
import { LoginComponent } from '../../core/auth/login/login.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [ LoginComponent, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @ViewChild(LoginComponent) loginModal!: LoginComponent;

  
}
