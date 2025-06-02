import { Component, computed, ElementRef, inject, model, signal, ViewChild } from '@angular/core';
import { DailyPlan } from '../models/daily-plan';
import { DailyPlanApiService } from '../services/APIs/dailyPlan-api.service';
import { Plan } from '../models/plan';
import { Blog } from '../models/blog';
import { InfoalertService } from '../services/infoalert.service';
import { ToastrService } from 'ngx-toastr';
import { DailyPlanFormComponent } from '../forms/daily-plan-form/daily-plan-form.component';
import { FormGroup, FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { PlanApiService } from '../services/APIs/plan-api.service';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-daily-plan',
  imports: [ReactiveFormsModule],
  templateUrl: './daily-plan.component.html',
  styleUrl: './daily-plan.component.css'
})
export class DailyPlanComponent {
  @ViewChild(DailyPlanFormComponent) dailyPlanForm!: DailyPlanFormComponent;
  dailyPlanService = inject(DailyPlanApiService);
  dailyPlanID = this.dailyPlanService.dailyPlanID;
  selectedPlan = model<Plan | undefined>(undefined);
  addedDailyPlan = model<DailyPlan | undefined>(undefined);
  selectedBlog = model<Blog | undefined>(undefined);
  toggleInfo = signal(false);
  toastrservice = inject(ToastrService);
  radioForm: FormGroup;
    planService = inject(PlanApiService);
    planID = this.planService.planID;
      authService = inject(AuthService);
      userId = this.authService.userId;
    modalOpen = signal(false);
 
  constructor(private fb: FormBuilder){
    this.radioForm = this.fb.group({
    selectedPlanID: new FormControl<number | null>(null),
    });
  }

  ngOnInit(): void {
    this.dailyPlanService.dailyPlanList.reload();

    this.radioForm.get('selectedPlanID')?.valueChanges.subscribe((id) => {
    if (id) this.planID.set(id);
  });
  }

  dailyPlanList = computed(()=> this.dailyPlanService.dailyPlanList.value() ?? [] as DailyPlan[]);

  selectedDailyPlan = computed(() => this.dailyPlanList().filter((item)=> item.planID == this.selectedPlan()!.id));

  selectedDailyBlogPlan = computed(() => this.dailyPlanList().filter((item)=> item.blogID == this.selectedBlog()!.id));
  
  userPlanList = computed(()=> this.planService.plansList.value()?.filter((plan)=> plan.userID === this.userId()))

  getDailyPlanByID(id:number){
    this.dailyPlanService.getDailyPlanByID(id).subscribe({next: (response) =>{
      this.addedDailyPlan.set({
        userID:this.userId(),
        blogID: null,
        planID:this.planID(),
        description: response.description,
        costs: response.costs,
        dayNumber: response.dayNumber,
        createdAt:response.createdAt,
        updatedAt: response.updatedAt
      }); 
    }});   
  }

  addSelectedDailyPlan(){
    if(!this.addedDailyPlan) return;
    const dailyPlan: DailyPlan = {
      userID:this.addedDailyPlan()!.userID,
      blogID: null,
      planID:this.planID(),
      description: this.addedDailyPlan()!.description,
      costs: this.addedDailyPlan()!.costs,
      dayNumber: this.addedDailyPlan()!.dayNumber,
      createdAt:this.addedDailyPlan()!.createdAt,
      updatedAt: this.addedDailyPlan()!.updatedAt
    };
    this.dailyPlanService.addDailyPlanFromBlog(dailyPlan).subscribe({
      next: () => {            
        this.dailyPlanService.dailyPlanList.reload();
        this.toastrservice.success('The plan was added.', 'Success', {closeButton: true, positionClass: 'toast-bottom-right'});
        this.closeModal(); 
      }
    }); 
  }
  deleteDailyPlan(id:number){
    this.dailyPlanService.deleteDailyPlan(id).subscribe(()=>
    this.dailyPlanService.dailyPlanList.reload())
  }
  
  openModal(id: number) {
   
    if(!this.userId()){
      this.toastrservice.warning('Please log in to add this to your plan.', 'Warn', {closeButton: true, positionClass: 'toast-bottom-right'});
      return;
    }
    this.modalOpen.set(true);
    this.getDailyPlanByID(id);


  }

  closeModal() {
    this.modalOpen.set(false);
  }


}
