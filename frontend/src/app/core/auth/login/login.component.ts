import { Component, inject, model, signal } from '@angular/core';
import { UsermenuComponent } from "../../../layout/usermenu/usermenu.component";
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth/auth.service';
import { RegistrationComponent } from "../../../user/registration/registration.component";
import { ValidationsComponent } from "../../../shared/validations/validations.component";

@Component({
  selector: 'app-login',
  imports: [UsermenuComponent, ReactiveFormsModule, RegistrationComponent, ValidationsComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authService = inject(AuthService);
  loggedIn = this.authService.loggedIn;
  signInOpen = model(false);
  modalOpen = signal(false);
  form: FormGroup;
  toastrservice = inject(ToastrService);

  constructor(private fb: FormBuilder){
    this.form = this.fb.group({
    email: new FormControl ('', [Validators.required, Validators.email]),
    password: new FormControl ('', [Validators.required, Validators.minLength(5)]),
  });
  }


  logIn(){
    this.authService.logIn(this.form.value.email, this.form.value.password)
    .then(() => {
      this.toastrservice.success('You are loged in.', 'Success', {closeButton: true, positionClass: 'toast-bottom-right'});
      this.closeModal();
    })
    .catch(()=> this.toastrservice.error('Log in failed: invalid e-mail or password.', 'Error', {closeButton: true, positionClass: 'toast-bottom-right'}));
    
  }
  onSubmit() {
    if (this.form.valid) {
      return this.form.value; 
    }
  }

  signIn(){
    this.signInOpen.set(true);
  }
  
  openModal() {
    this.modalOpen.set(true);
  }

  closeModal() {
    this.modalOpen.set(false);
  }

}

