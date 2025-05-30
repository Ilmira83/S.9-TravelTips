import { inject, Injectable, signal } from '@angular/core';
import { Blog } from '../../models/blog';
import { HttpClient, httpResource } from '@angular/common/http';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogsAPIService {
  private http = inject(HttpClient);
  private myAppUrl:string;
  private myApiUrl:string;
  blogID = signal<number>(0);

    constructor(){
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = environment.blogs;
  }

 blogsList = httpResource<Blog[]>(() => `${this.myAppUrl}${this.myApiUrl}`);  

 
  addBlog(blog:Blog){
    return this.http.post<Blog>(`${this.myAppUrl}${this.myApiUrl}`, blog)
  }
  deleteBlog(id:number){
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }
  getBlogByID(id:number){
    return this.http.get<Blog>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }
  updateBlog(id:number, blog:Partial<Blog>){
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}${id}`, blog)
  }


}
