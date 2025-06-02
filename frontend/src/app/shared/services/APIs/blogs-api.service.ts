import { inject, Injectable, signal } from '@angular/core';
import { Blog } from '../../models/blog';
import { HttpClient, httpResource } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { Post } from '../../models/post';

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

 
  addBlog(blog:Post){
    return this.http.post<Post>(`${this.myAppUrl}${this.myApiUrl}`, blog)
  }
  deleteBlog(id:number){
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }
  getBlogByID(id:number){
    return this.http.get<Post>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }
  updateBlog(id:number, blog:Partial<Post>){
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}${id}`, blog)
  }


}
