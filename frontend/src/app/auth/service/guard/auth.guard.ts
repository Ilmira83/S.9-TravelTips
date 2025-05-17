import { inject, Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class LoginGuard implements CanActivate {
  authService = inject(AuthService);
  router = inject(Router);
  toastrservice = inject(ToastrService);

  canActivate():boolean {
    if (this.authService.loggedIn()) {
      return true;
    } else {
      this.toastrservice.warning('Please, log in to acces the starships list.', 'Info', {closeButton: true});
      return false;
    }
  }
} 
