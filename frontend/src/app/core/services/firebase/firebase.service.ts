import { Injectable } from '@angular/core';
import { getAuth } from '@angular/fire/auth'
import { initializeApp} from 'firebase/app';



const firebaseConfig = {
  apiKey: "AIzaSyCp7S3M41GGASjIonWWby2n7prK5smC8E0",
  authDomain: "traveltips-acb09.firebaseapp.com",
  projectId: "traveltips-acb09",
  storageBucket: "traveltips-acb09.firebasestorage.app",
  messagingSenderId: "137320861208",
  appId: "1:137320861208:web:a235ba950ac2c4a9e87d6d",
  measurementId: "G-GCEWW95BG6"
};

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private _app = initializeApp(firebaseConfig);
  private _auth = getAuth(this._app);


  get app(){
    return this._app;
  }
  get auth(){
    return this._auth;
  }

}


