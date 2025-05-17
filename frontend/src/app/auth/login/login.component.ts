import { Component, inject, signal } from '@angular/core';
import { UsermenuComponent } from "../../layout/usermenu/usermenu.component";
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserAuth } from '../model/user-auth';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [UsermenuComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authService = inject(AuthService);
  loggedIn:boolean = false;
  signInOpen:boolean = false;
  user = signal<UserAuth | null>(null);
  modalOpen = signal(false);
  form: FormGroup;
  toastrservice = inject(ToastrService);

  constructor(private fb: FormBuilder){
    this.form = this.fb.group({
    email: new FormControl ('', [Validators.required, Validators.email]),
    password: new FormControl ('', [Validators.required, Validators.minLength(5), Validators.pattern(/^[0-9]+$/)]),
    username: new FormControl ('', [Validators.required]),
  });
  }

  setUserData(){
    this.user.set(
    { email: this.form.value.email,
      password: this.form.value.password,
      username:this.form.value.username }
    )
  }

  logIn(){
    this.authService.logIn(this.form.value.email, this.form.value.password)
    .then(() => {
      this.toastrservice.success('You are loged in.', 'Success', {closeButton: true});
      this.closeModal();
      this.loggedIn = true; 
    })
    .catch(()=> this.toastrservice.error('Log in failed: invalid e-mail or password.', 'Error', {closeButton: true}));
    
  }
  registerUser(){
    this.setUserData()
    this.authService.register(this.form.value.email, this.form.value.password, this.form.value.username)!
    .then(() => {
      this.form.reset();
      this.toastrservice.success('You are registered now.', 'Success', {closeButton: true});
    })
    .catch(() => {
     this.toastrservice.error('Registration mistake: This e-mail already in use.', 'Error', {closeButton: true});
    });
    this.signInOpen = false;
  }

  logOut(){
    this.authService.logOut()!
    this.loggedIn = false;
  }

  signIn(){
    this.signInOpen = true;
  }
  
  openModal() {
    this.modalOpen.set(true);
  }

  closeModal() {
    this.modalOpen.set(false);
  }

}

