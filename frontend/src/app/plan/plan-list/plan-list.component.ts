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
  blogsUtils = inject(BlogsUtilsService);
  router = inject(Router);
  planService = inject(PlanApiService);
  dailyPlanService = inject(DailyPlanApiService);

  userId = this.authService.userId;  
  search = this.blogsUtils.searchCriteria;
  planID = this.planService.planID;


  planList = computed(()=> {
    const plans = this.planService.plansList.value() ?? [] as Plan[];
    return [...plans].sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  })

  userPlanlist = computed(()=> this.blogsUtils.filetredPlanList().filter(plan => plan.userID === this.userId()))

  resetCurrentID(){
    this.planID.set(0)
  }

  navigateToPlanDetails(id: number) {
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
