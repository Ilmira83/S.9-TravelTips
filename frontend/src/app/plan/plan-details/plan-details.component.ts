import { Component, inject, model, signal } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { PlanApiService } from '../../shared/services/APIs/plan-api.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Plan } from '../../shared/models/plan';
import { DailyPlanComponent } from "../../shared/daily-plan/daily-plan.component";

@Component({
  selector: 'app-plan-details',
  imports: [RouterLink, DailyPlanComponent],
  templateUrl: './plan-details.component.html',
  styleUrl: './plan-details.component.css'
})
export class PlanDetailsComponent {
  authService = inject(AuthService);
  userID = this.authService.userId;
  planService = inject(PlanApiService);
  planID = this.planService.planID;
  breadcrumbs: { label: string, url: string }[] = [];
  selectedPlan = model<Plan | undefined>(undefined);

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.planID.set(params['id']);

    this.route.queryParams.subscribe(queryParams => {
        const from = queryParams['from'];
        this.generateBreadcrumbs(from); 
      });
    });
    this.getPlan(this.planID())
  }


  getPlan(id:number){
    this.planID.set(id);
    this.planService.getPlanByID(id).subscribe(response =>
      this.selectedPlan.set({
        id: response.id,
        userID:response.userID,
        title: response.title,
        destination: response.destination,
        country: response.country,
        city: response.city,
        description: response.description,
        travelers: response.travelers,
        costs: response.costs,
        month: response.month,
        year: response.year,
        nDays: response.nDays,
        updatedAt: response.updatedAt
     })
    );
  }


  generateBreadcrumbs(from: string) {
    const baseCrumbs = [
      { label: 'Home', url: '/' },
      { label: 'Plan details', url: `/app-plan-details/${this.planID()}` }
    ];

    if (from === 'app-profile') {
      this.breadcrumbs = [
        { label: 'My profile', url: `/app-profile/${this.userID()}` },
        { label: 'My plans', url: '/app-plan-list' }, 
        { label: 'Plan details', url: `/app-plan-details/${this.planID()}` }
      ];
    } 
    else if (from === 'app-plan-list') {
      this.breadcrumbs = [
        { label: 'My profile', url: `/app-profile/${this.userID()}` },
        { label: 'My plans', url: '/app-plan-list' },
        { label: 'Plan details', url: `/app-plan-details/${this.planID()}` }
      ];
    } 
    else {
      this.breadcrumbs = baseCrumbs;
    }
  }

}
