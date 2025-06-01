import { Component, inject, model, ViewChild } from '@angular/core';
import { DailyPlanFormComponent } from '../../shared/forms/daily-plan-form/daily-plan-form.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { PlanApiService } from '../../shared/services/APIs/plan-api.service';
import { DailyPlan } from '../../shared/models/daily-plan';
import { DailyPlanApiService } from '../../shared/services/APIs/dailyPlan-api.service';
import { ToastrService } from 'ngx-toastr';
import { EditFormComponent } from "../../shared/forms/edit-form/edit-form.component";
import { Post } from '../../shared/models/post';

@Component({
  selector: 'app-plan-editor',
  imports: [ DailyPlanFormComponent, RouterLink, RouterLinkActive, EditFormComponent ],
  templateUrl: './plan-editor.component.html',
  styleUrl: './plan-editor.component.css',
})
export class PlanEditorComponent {
  @ViewChild(EditFormComponent) editForm!: EditFormComponent;
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
    const plan = this.editForm.onSubmit();
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
        this.toastrservice.info(`Plan ${plan.title} was  created.`,
        'Info', { closeButton: true, positionClass: 'toast-bottom-right' } );
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
    next: (plan: Post) => {
      this.editForm.setValue(plan);
    },
  });
  }

  updatePlan() {
    const planData = this.editForm.onSubmit();
    if (!planData) return;
    this.planService.updatePlan(this.planID()!, planData).subscribe({
      next: () => {
        this.updateDailyPlansByPlanID();
        this.toastrservice.info(`Plan ${planData.title} was  updated.`,
        'Info', { closeButton: true, positionClass: 'toast-bottom-right' } );
        this.planService.plansList.reload();
        this.router.navigate(['app-plan-list']);
        this.editForm.resetForm();
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
