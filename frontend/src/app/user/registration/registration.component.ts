import { Component, computed, inject, model, signal } from '@angular/core';
import { User } from '../../shared/models/user';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserAuth } from '../../core/auth/model/user-auth';
import { AuthService } from '../../core/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { UserApiService } from '../../shared/services/APIs/user-api.service';
import { ValidationsComponent } from "../../shared/validations/validations.component";


@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule, ValidationsComponent],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  userService = inject(UserApiService);
  authService =inject(AuthService);
  userPhoto = signal<string>('');
  newUser:FormGroup;
  user = signal<UserAuth | null>(null);
  toastrservice = inject(ToastrService);
  signInOpen = model(false);
  fbUID = this.userService.fbUID;

  userList = computed(() => this.userService.userList.value() ?? [] as User[]);

  constructor(private fb:FormBuilder){
    this.newUser = this.fb.group({
    email: new FormControl ('', [Validators.required, Validators.email]),
    password: new FormControl ('', [Validators.required, Validators.minLength(5)]),
    username: new FormControl ('', [Validators.required]),
    userPhoto: ''
    })
  }
  //db add
  addUser() {
    const userData = this.newUser.value;      
    if(!userData) return;
      const user: User = {
        fbUID: this.fbUID(),
        username: userData.username,
        userPhoto: this.userPhoto(),
      };
      this.userService.addUser(user).subscribe({
        next: () => {
          this.userService.userList.reload();
        }
    }); 
  }
  setUserData(){
    this.user.set(
    { 
      email: this.newUser.value.email,
      password: this.newUser.value.password,
      username:this.newUser.value.username,
     }
    );
  }
  //FB auth
  async registerUser(){
    try{
    this.setUserData();
    if(!this.newUser.value.email || !this.newUser.value.password || !this.newUser.value.username){
      this.toastrservice.warning('Please, enter Email, password and Username!', 'Warn', {closeButton: true, positionClass: 'toast-bottom-right'})
      return;
    }
    const userCredential= await this.authService.register(this.newUser.value.email, this.newUser.value.password, this.newUser.value.username)!
    this.fbUID.set(userCredential.user.uid);
    this.toastrservice.success('You are registered now.', 'Success', {closeButton: true, positionClass: 'toast-bottom-right'});
    this.signInOpen.set(false);
    this.addUser();
    this.newUser.reset();
    }
    catch(error)  {
     this.toastrservice.error('Registration mistake: This e-mail already in use.', 'Error', {closeButton: true, positionClass: 'toast-bottom-right'});
    };  
  }

  onFileSelected(event: Event){
    const file = (event.target as HTMLInputElement).files?.[0];
    this.newUser.patchValue({userPhoto: file});
    if(file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.userPhoto.set(reader.result as string);
     };
      reader.readAsDataURL(file);
    }
  }

  cancelRegistration(){
    this.signInOpen.set(false);
  }



}
