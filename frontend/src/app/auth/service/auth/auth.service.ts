import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from '../../../core/services/firebase/firebase.service';
import { UserAuth } from '../../model/user-auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseService = inject(FirebaseService);
  user = signal<UserAuth | null>(null);
  loggedIn = signal<boolean>(false);
  newReg = signal<boolean>(false);
  router = inject(Router);
  toastrservice = inject(ToastrService);

  register(email:string, password:string, username:string){
    if(!email || !password || !username){
      this.toastrservice.warning('Please, enter Email, password and Username!', 'Warn', {closeButton: true})
      return;
    }
    return createUserWithEmailAndPassword(this.firebaseService.auth, email, password)
  }
 
  logIn(email:string, password:string) {
    return signInWithEmailAndPassword(this.firebaseService.auth, email, password)
  }
  
  logOut(){
    signOut(this.firebaseService.auth)
    .then (()=>{
    this.toastrservice.info('You are loged out.', 'Info', {closeButton: true}); 
    })
    .catch(()=>console.error('Log out failed'))
  }

}
