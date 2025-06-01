import { Component, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { InfoalertService } from '../../services/infoalert.service';
import { DailyPlan } from '../../models/daily-plan';
import { AuthService } from '../../../core/services/auth/auth.service';
import { PlanApiService } from '../../services/APIs/plan-api.service';
import { BlogsAPIService } from '../../services/APIs/blogs-api.service';
import { DailyPlanApiService } from '../../services/APIs/dailyPlan-api.service';
import { ValidationsComponent } from '../../validations/validations.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-daily-plan-form',
  imports: [ReactiveFormsModule, ValidationsComponent],
  templateUrl: './daily-plan-form.component.html',
  styleUrl: './daily-plan-form.component.css',
})
export class DailyPlanFormComponent {
  infoMess = inject(InfoalertService);
  authService = inject(AuthService);
  planService = inject(PlanApiService);
  blogService = inject(BlogsAPIService);
  dailyPlanService = inject(DailyPlanApiService);
  toastrservice = inject(ToastrService);
  private formBuilder = inject(FormBuilder);

  dailyPlanData = signal<DailyPlan[] | null>(null);

  userId = this.authService.userId;
  planID = this.planService.planID;
  blogID = this.blogService.blogID;

  dailyPlanForm: FormGroup;

  constructor() {
    this.dailyPlanForm = this.formBuilder.group({
      days: this.formBuilder.array([this.createDayFormGroup(0)]),
    });
  }

  createDayFormGroup(dayNumber: number): FormGroup {
    return this.formBuilder.group({
      dayNumber: [dayNumber || null, [Validators.required]],
      descriptions: this.formBuilder.array([
        this.formBuilder.group({
          id: [null],
          description: ['', [Validators.required]],
        }),
      ]),
    });
  }

  get daysArray(): FormArray {
    return this.dailyPlanForm.get('days') as FormArray;
  }

  getDayDescriptions(index: number): FormArray {
    return (this.daysArray.at(index) as FormGroup).get('descriptions') as FormArray;
  }

  addDay() {
    const newDayNumber = this.daysArray.length;
    this.daysArray.push(this.createDayFormGroup(newDayNumber));
  }

  addDescription(index: number) {
    const descriptions = this.getDayDescriptions(index);
    descriptions.push(
      this.formBuilder.group({
        id: [null],
        description: ['', [Validators.required]],
      })
    );
  }

  removeDay(index: number) {
    const dayGroup = this.daysArray.at(index) as FormGroup;
    const dayNumber = dayGroup.get('dayNumber')?.value;

    this.deleteDailyPlansByDayNumber(dayNumber);
    this.daysArray.removeAt(index);
  }

  removeDescription(index: number, descIndex: number) {
    const descriptions = this.getDayDescriptions(index);
    const descControl = descriptions.at(descIndex);
    const descText = descControl?.get('description')?.value;

    if (descText) {
      this.deleteDailyPlanDescription(descText);
    }
    descriptions.removeAt(descIndex);
  }

  deleteDailyPlanDescription(descText: string) {
    if (!this.dailyPlanService.dailyPlanList.value()) return;

    const foundItem = this.dailyPlanService.dailyPlanList.value()?.find(
      (item) => item.planID === this.planID() && item.description === descText
    );

    if (!foundItem || !foundItem.id) return;

    this.dailyPlanService.deleteDailyPlan(foundItem.id).subscribe(() => {
      this.dailyPlanService.dailyPlanList.reload();
    });
  }

  deleteDailyPlansByDayNumber(dayNumber: number) {

    if (!this.dailyPlanService.dailyPlanList.value()) return;

    const matchingPlans = this.dailyPlanService.dailyPlanList.value()?.filter(
      (item) => item.planID === this.planID() && item.dayNumber === dayNumber && item.id
    );
    matchingPlans?.forEach((item) => {
      this.dailyPlanService.deleteDailyPlan(item.id!).subscribe(() => {
        this.dailyPlanService.dailyPlanList.reload(); 
      });
    });
  }

  onSubmitDailyPlan(): DailyPlan[] | null {
    
 /*    if (!this.dailyPlanForm.valid) return ; */
    if(!this.dailyPlanForm.valid){ this.toastrservice.warning('Please complete all the fields with asteriscs(*).',
       'Warn', {closeButton: true, positionClass: 'toast-bottom-right'});
    return null;}

    const formValue = this.dailyPlanForm.value;
    const flattenedPlans: DailyPlan[] = [];
    const isPlan = !!this.planID();
    formValue.days.forEach((day: any) => {
      day.descriptions.forEach(
        (descGroup: { id?: number; description: string }) => {
          flattenedPlans.push({
            id: descGroup.id ?? undefined,
            dayNumber: day.dayNumber,
            description: descGroup.description,
            userID: this.userId(),
            planID: isPlan ? this.planID() : null,
            blogID: isPlan ? null : this.blogID(),
          });
        }
      );
    });
    this.dailyPlanData.set(flattenedPlans); // now array with flat objects
    return flattenedPlans;
  }

  setValue(dailyPlans: DailyPlan[]) {
    try {
      this.dailyPlanForm.reset();
      if (!dailyPlans || dailyPlans.length === 0) {
        return;
      }
      const grouped = new Map<number, DailyPlan[]>();

      dailyPlans.forEach((plan) => {
        if (!grouped.has(plan.dayNumber)) {
          grouped.set(plan.dayNumber, []);
        }
        grouped.get(plan.dayNumber)?.push(plan);
      });

      const dayGroups = Array.from(grouped.entries()).map(
        ([dayNumber, plans]) =>
          this.formBuilder.group({
            dayNumber: [dayNumber],
            descriptions: this.formBuilder.array(
              plans.map((dailyPlan) =>
                this.formBuilder.group({
                  id: [dailyPlan.id ?? null],
                  description: [dailyPlan.description],
                })
              )
            ),
          })
      );

      const daysFormArray = this.formBuilder.array(dayGroups);
      this.dailyPlanForm.setControl('days', daysFormArray);
    } catch (error) {
      console.error('Error setting form values:', error);
    }
  }

  openInfo() {
    this.infoMess.showInfo(this.infoMess.messDailyPlan);
    this.infoMess.openInfo.set(true);
  }

  closeInfo = () => this.infoMess.openInfo.set(false);


}
