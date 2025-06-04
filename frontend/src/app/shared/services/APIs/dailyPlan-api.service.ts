import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environment/environment';
import { DailyPlan } from '../../models/daily-plan';

@Injectable({
  providedIn: 'root'
})
export class DailyPlanApiService {
  private http = inject(HttpClient);
  private myAppUrl:string;
  private myApiUrl1:string;
  private myApiUrl2:string;
  private myApiUrl3:string;
  dailyPlanID = signal<number | null>(null);

  constructor(){
    this.myAppUrl = environment.endpoint;
    this.myApiUrl1 = environment.dailyPlans;
    this.myApiUrl2 = environment.dailyPlanByPlanID;
    this.myApiUrl3 = environment.dailyPlanByBlogID;
  }

  dailyPlanList = httpResource<DailyPlan[]>(() => `${this.myAppUrl}${this.myApiUrl1}`);

  addDailyPlan(dailyPlan:DailyPlan[]){
    return this.http.post<DailyPlan[]>(`${this.myAppUrl}${this.myApiUrl1}`, dailyPlan)
  }  
  addDailyPlanFromBlog(dailyPlan:DailyPlan){
    return this.http.post<DailyPlan>(`${this.myAppUrl}${this.myApiUrl1}`, dailyPlan)
  }
  deleteDailyPlan(id:number){
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl1}${id}`)
  }
  getDailyPlanByID(id:number){
    return this.http.get<DailyPlan>(`${this.myAppUrl}${this.myApiUrl1}${id}`)
  }
  updateDailyPlan(id:number, dailyPlan:DailyPlan){
    return this.http.put(`${this.myAppUrl}${this.myApiUrl1}${id}`, dailyPlan)
  }

  getDailyPlansByPlanID(planID: number) {
    return this.http.get<DailyPlan[]>(`${this.myAppUrl}${this.myApiUrl1}${this.myApiUrl2}${planID}`);
}
  updateDailyPlansByPlanID(planID:number, dailyPlan:DailyPlan[]){
    return this.http.put(`${this.myAppUrl}${this.myApiUrl1}${this.myApiUrl2}${planID}`, dailyPlan)
  }
  updateDailyPlansByBlogID(blogID:number, dailyPlan:DailyPlan[]){
    return this.http.put(`${this.myAppUrl}${this.myApiUrl1}${this.myApiUrl3}${blogID}`, dailyPlan)
  }
  getDailyPlansByBlogID(blogID: number) {
    return this.http.get<DailyPlan[]>(`${this.myAppUrl}${this.myApiUrl1}${this.myApiUrl3}${blogID}`);
}


} 
