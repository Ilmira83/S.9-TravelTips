import { inject, Injectable, signal } from '@angular/core';
import { User } from '../../models/user';
import { HttpClient, httpResource } from '@angular/common/http';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private http = inject(HttpClient);
  private myAppUrl:string;
  private myApiUrl:string;
  userPhoto = signal<string>('');
  fbUID = signal<string>('');

  constructor(){
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = environment.users;
  }
  
  userList = httpResource<User[]>(() => `${this.myAppUrl}${this.myApiUrl}`);

  addUser(user:User){
    return this.http.post<User>(`${this.myAppUrl}${this.myApiUrl}`, user)
  }

  deleteUser(id:number){
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }
  getUserByID(id:string){
    return this.http.get<User>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }
  updateUser(id:number, user:User){
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}${id}`, user)
  }





}
