import { Component, computed, inject, signal } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { BlogsUtilsService } from '../../shared/services/utils/blogs-utils.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Plan } from '../../shared/models/plan';
import { PlanApiService } from '../../shared/services/APIs/plan-api.service';
import { DailyPlanApiService } from '../../shared/services/APIs/dailyPlan-api.service';

@Component({
  selector: 'app-plan-list',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './plan-list.component.html',
  styleUrl: './plan-list.component.css'
})
export class PlanListComponent {
  authService = inject(AuthService);
  userId = this.authService.userId;
  blogsUtils = inject(BlogsUtilsService);
  search = this.blogsUtils.searchCriteria;
  isSorted = this.blogsUtils.isSorted;
  router = inject(Router);
  planService = inject(PlanApiService);
  planID = this.planService.planID;
  dailyPlanService = inject(DailyPlanApiService);
  dailyPlanID = this.dailyPlanService.dailyPlanID;


  planList = computed(()=> {
    const plans = this.planService.plansList.value() ?? [] as Plan[];
    return [...plans].sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  })

  userPlanlist = computed(()=> this.blogsUtils.filetredPlanList().filter(plan => plan.userID === this.userId()))


  filetredByDestination(destination:string){
    this.blogsUtils.selectedDestination.set(destination);
  }

  resetCurrentID(){
    this.planID.set(0)
  }
  //здесь передавать dailyPlanID который тоже внести в таблицу на сервере
  navigateToBlogDetails(id: number) {
    this.router.navigate(['/app-plan-details', id], { 
      queryParams: { from: 'app-plan-list' }       
    });
  }

  getPlanByID(id:number){
    this.planID.set(id);
    this.router.navigate(['/app-plan-editor'])
  }

  deletePlan(id:number){
    this.planID.set(id)
    this.planService.deletePlan(id).subscribe(()=> 
    this.planService.plansList.reload())
    this.deleteDailyPlan()
  }

  deleteDailyPlan(){
    const dailyPlanToDelete = this.dailyPlanService.dailyPlanList.value()?.filter((item)=> item.planID === this.planID());
   
     dailyPlanToDelete?.forEach(element => { this.dailyPlanService.deleteDailyPlan(element.id!).subscribe(()=> 
    this.dailyPlanService.dailyPlanList.reload())  
    }); 
  }




}
