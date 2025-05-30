import { Component, inject, model, ViewChild } from '@angular/core';
import { DailyPlanFormComponent } from '../../shared/forms/daily-plan-form/daily-plan-form.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { PlanFormComponent } from '../../shared/forms/plan-form/plan-form.component';
import { PlanApiService } from '../../shared/services/APIs/plan-api.service';
import { Plan } from '../../shared/models/plan';
import { DailyPlan } from '../../shared/models/daily-plan';
import { DailyPlanApiService } from '../../shared/services/APIs/dailyPlan-api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-plan-editor',
  imports: [
    DailyPlanFormComponent,
    RouterLink,
    RouterLinkActive,
    PlanFormComponent,
  ],
  templateUrl: './plan-editor.component.html',
  styleUrl: './plan-editor.component.css',
})
export class PlanEditorComponent {
  @ViewChild(PlanFormComponent) planForm!: PlanFormComponent;
  @ViewChild(DailyPlanFormComponent) dailyPlanForm!: DailyPlanFormComponent;

  authService = inject(AuthService);
  planService = inject(PlanApiService);
  dailyPlanService = inject(DailyPlanApiService);
  toastrservice = inject(ToastrService);

  router = inject(Router);
  isFormValid = model<boolean>(false);

  userId = this.authService.userId;
  planID = this.planService.planID;
  dailyPlanID = this.dailyPlanService.dailyPlanID;

  addPlan() {
    const plan = this.planForm.onSubmit();
    if (!this.isFormValid()) {
      this.toastrservice.warning('Please complete all the fields with asteriscs(*).',
        'Warn', { closeButton: true, positionClass: 'toast-bottom-right' } );
      return;
    }
    if (!plan) return;
    this.planService.addPlan(plan).subscribe({
      next: (plan) => {
        this.planID.set(plan.id!);
        this.addDailyPlan();
        this.planService.plansList.reload();
        this.router.navigate(['app-plan-list']);
      },
    });
  }

  ngOnInit() {
    if (!this.planID()) return;
    this.getPlanByID(this.planID());
    this.getDailyPlanByPlanID();
    
  }

  getPlanByID(id: number) {
   this.planService.getPlanByID(id).subscribe({
    next: (plan: Plan) => {
      this.planForm.setValue(plan);
    },
  });
  }

  updatePlan() {
    const planData = this.planForm.onSubmit();
    if (!planData) return;
    this.planService.updatePlan(this.planID()!, planData).subscribe({
      next: () => {
        this.updateDailyPlansByPlanID();
        this.planService.plansList.reload();
        this.router.navigate(['app-plan-list']);
        this.planForm.resetForm();
      },
    });
  }

  addDailyPlan() {
    const dailyPlanData = this.dailyPlanForm.onSubmitDailyPlan();
    if (!dailyPlanData || dailyPlanData.length === 0) return;

    this.dailyPlanService.addDailyPlan(dailyPlanData).subscribe({
      next: () => {
        this.dailyPlanService.dailyPlanList.reload();
      },
    });
  }

  getDailyPlanByPlanID() {
    this.dailyPlanService
      .getDailyPlansByPlanID(this.planID())
      .subscribe((response: DailyPlan[]) =>
        this.dailyPlanForm.setValue(response)
      );
  }

  updateDailyPlansByPlanID() {
    const dailyPlanData = this.dailyPlanForm.onSubmitDailyPlan();
    if (!dailyPlanData || dailyPlanData.length === 0) return;

    this.dailyPlanService
      .updateDailyPlansByPlanID(this.planID(), dailyPlanData)
      .subscribe({
        next: () => {
          this.dailyPlanService.dailyPlanList.reload();
        },
      });
  }
}
