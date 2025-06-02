import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { FirebaseService } from '../firebase/firebase.service';
import { UserAuth } from '../../auth/model/user-auth';
import { ToastrService } from 'ngx-toastr';
import { authState } from '@angular/fire/auth';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseService = inject(FirebaseService);
  user = signal<UserAuth | null>(null);
  router = inject(Router);
  toastrservice = inject(ToastrService);

  private authState$ = authState(this.firebaseService.auth);
  currentUser = toSignal(this.authState$, { initialValue: null as User | null }); //observable to signal
  loggedIn = computed(() => !!this.currentUser());
  userId = computed(() => this.currentUser()?.uid || null);

  register(email:string, password:string, username:string){
    return createUserWithEmailAndPassword(this.firebaseService.auth, email, password)
  }
 
  logIn(email:string, password:string) {
    return signInWithEmailAndPassword(this.firebaseService.auth, email, password)
  }

  logOut(){
    signOut(this.firebaseService.auth)
    .then (()=>{
    this.router.navigate(['/'])
    this.toastrservice.info('You are loged out.', 'Info', {closeButton: true, positionClass: 'toast-bottom-right'}); 
    })
    .catch(()=>console.error('Log out failed'))
  }
  
}
