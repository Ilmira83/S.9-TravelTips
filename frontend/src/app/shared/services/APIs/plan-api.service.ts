import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Plan } from '../../models/plan';

@Injectable({
  providedIn: 'root'
})
export class PlanApiService {
  private http = inject(HttpClient);
  private myAppUrl:string;
  private myApiUrl:string;
  planID = signal<number>(0);

  constructor(){
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = environment.plans;
  }

  plansList = httpResource<Plan[]>(() => `${this.myAppUrl}${this.myApiUrl}`);

  addPlan(plan:Plan){
    return this.http.post<Plan>(`${this.myAppUrl}${this.myApiUrl}`, plan)
  }
  deletePlan(id:number){
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }
  getPlanByID(id:number){
    return this.http.get<Plan>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }
  updatePlan(id:number, plan:Plan){
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}${id}`, plan)
  }


}
