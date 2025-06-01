import { Injectable, signal } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class InfoalertService {
  mess = signal<string>('');
  openInfo = signal(false);
  messDailyPlan:string = `Complete your travel plan by adding a short description for each day. 
                          Be concise and focus on key activities!
                          Ex.g.: Day 1: Travel to destination: direct flight from 
                          Barcelona to Hong-Kong. Taxi to aeroport. In Hong-Kong - train from aeroport to hotel at Hong-Kong island.`
  deleteConfirm = signal(false);
 
  showInfo=(info:string)=> this.mess.set(info) 

  deleteConfirmation(){
    this.deleteConfirm.set(true);
  }
}
