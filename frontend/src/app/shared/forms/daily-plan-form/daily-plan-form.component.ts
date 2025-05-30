import { Component, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InfoalertService } from '../../services/infoalert.service';
import { BlogsUtilsService } from '../../services/utils/blogs-utils.service';
import { DailyPlan } from '../../models/daily-plan';
import { AuthService } from '../../../core/services/auth/auth.service';
import { PlanApiService } from '../../services/APIs/plan-api.service';
import { BlogsAPIService } from '../../services/APIs/blogs-api.service';
import { DailyPlanApiService } from '../../services/APIs/dailyPlan-api.service';

@Component({
  selector: 'app-daily-plan-form',
  imports: [ReactiveFormsModule],
  templateUrl: './daily-plan-form.component.html',
  styleUrl: './daily-plan-form.component.css'
})
export class DailyPlanFormComponent {
  infoMess = inject(InfoalertService);
  infoDailyPlan= this.infoMess.messDailyPlan;
  toggleInfo:boolean = false;
  dailyPlanData = signal<DailyPlan[] | null>(null);
  authService = inject(AuthService);
  userId = this.authService.userId;
  planService = inject(PlanApiService);
  planID = this.planService.planID;
  blogService = inject(BlogsAPIService);
  blogID = this.blogService.blogID;
  dailyPlanService = inject(DailyPlanApiService);
  dailyPlanID = this.dailyPlanService.dailyPlanID;

  private formBuilder = inject(FormBuilder)
  dailyPlanForm: FormGroup;

  constructor() {
    this.dailyPlanForm = this.formBuilder.group({
      days: this.formBuilder.array([
        this.createDayFormGroup(0) 
      ])
    });
  }
  createDayFormGroup(dayNumber: number): FormGroup {
    return this.formBuilder.group({
      dayNumber: [dayNumber || 1],
      descriptions: this.formBuilder.array([
        this.formBuilder.group({
          id: [null],
          description: ['']
        })
      ])
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
    descriptions.push(this.formBuilder.group({
    id: [null],
    description: ['']
  }));
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

  deleteDailyPlanDescription(descText: string){
    const planID = this.planID();
    const dailyPlans = this.dailyPlanService.dailyPlanList.value();

    if (!dailyPlans) return;

    const foundItem = dailyPlans.find(item =>
      item.planID === planID && item.description === descText
    );

    if (!foundItem || !foundItem.id) return;

    this.dailyPlanService.deleteDailyPlan(foundItem.id).subscribe(() => {
      this.dailyPlanService.dailyPlanList.reload();
    });
  }

  deleteDailyPlansByDayNumber(dayNumber: number) {
    const planID = this.planID();
    const dailyPlans = this.dailyPlanService.dailyPlanList.value();

    if (!dailyPlans) return;

    const matchingPlans = dailyPlans.filter(item =>
      item.planID === planID && item.dayNumber === dayNumber && item.id
    );

    matchingPlans.forEach(item => {
      this.dailyPlanService.deleteDailyPlan(item.id!).subscribe(() => {
        this.dailyPlanService.dailyPlanList.reload(); // можно перенести за пределы цикла
      });
    });
}
//я получаю данные введенные пользователем
  onSubmitDailyPlan(): DailyPlan[] | null {

    if (!this.dailyPlanForm.valid) return null;

    const formValue = this.dailyPlanForm.value;
    const flattenedPlans: DailyPlan[] = [];
    const isPlan = !!this.planID();
    formValue.days.forEach((day: any) => {
      day.descriptions.forEach((descGroup: { id?: number, description: string }) => {
        flattenedPlans.push({
          id: descGroup.id ?? undefined,
          dayNumber: day.dayNumber,
          description: descGroup.description,
          userID: this.userId(),
          planID: isPlan ? this.planID() : null,
          blogID: isPlan ? null : this.blogID()
        });
      });
    });
      this.dailyPlanData.set(flattenedPlans); // now array with flat objects
      return flattenedPlans
  }

  setValue(dailyPlans: DailyPlan[]) {
    try {
      this.dailyPlanForm.reset();
      if (!dailyPlans || dailyPlans.length === 0) {
        return;
      }
    const grouped = new Map<number, DailyPlan[]>();

    dailyPlans.forEach(plan => {
      if (!grouped.has(plan.dayNumber)) {
        grouped.set(plan.dayNumber, []);
      }
      grouped.get(plan.dayNumber)?.push(plan); 
    });

    const dayGroups = Array.from(grouped.entries()).map(([dayNumber, plans]) =>
      this.formBuilder.group({
        dayNumber: [dayNumber],
        descriptions: this.formBuilder.array(
          plans.map(p => this.formBuilder.group({
            id: [p.id ?? null],
            description: [p.description]
          }))
        )
      })
    );

    const daysFormArray = this.formBuilder.array(dayGroups);
    this.dailyPlanForm.setControl('days', daysFormArray);

  } catch (error) {
    console.error('Error setting form values:', error);
  }
}


  showInfo(event: MouseEvent){
    event.stopPropagation();
    this.infoMess.showInfo(this.infoDailyPlan)
    this.toggleInfo = true
  }

  closeInfo=()=> this.toggleInfo = false
      
  ngOnInit(){
    window.addEventListener('click', () => this.closeInfo());
  }
  ngOnDestroy() {
    window.removeEventListener('click', () => this.closeInfo());
  }








}
