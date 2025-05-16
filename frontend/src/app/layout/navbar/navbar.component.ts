import { Component } from '@angular/core';
import { UsermenuComponent } from "../usermenu/usermenu.component";

@Component({
  selector: 'app-navbar',
  imports: [UsermenuComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  loggedIn:boolean = false;
  destinations: string[] = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];

  logIn(){
    this.loggedIn = !this.loggedIn
  }
}
