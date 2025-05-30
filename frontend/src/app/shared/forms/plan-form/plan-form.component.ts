import { Component, computed, inject, model, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Plan } from '../../models/plan';
import { BlogsUtilsService } from '../../services/utils/blogs-utils.service';
import { DestinationAPIService } from '../../services/APIs/countryAPIs/country-api.service';
import { Country } from '../../models/country';
import { AuthService } from '../../../core/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ValidationsComponent } from "../../validations/validations.component";

@Component({
  selector: 'app-plan-form',
  imports: [ReactiveFormsModule, ValidationsComponent],
  templateUrl: './plan-form.component.html',
  styleUrl: './plan-form.component.css'
})
export class PlanFormComponent {
  blogUtils = inject(BlogsUtilsService);
  countryService = inject(DestinationAPIService);
  authService = inject(AuthService); 

  userId = this.authService.userId;
  selectedCountry = this.countryService.selectedCountry;

  isFormValid = model<boolean>(false);
  countriesList = computed(() => this.countryService.apiResponse.value()?.data);  

  planForm:FormGroup;

  constructor(private fb: FormBuilder){
    this.planForm =  this.fb.group({
      title: new FormControl ('', [Validators.required]),
      destination: new FormControl ('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      city: new FormControl(''),
      travelers: new FormControl(null),
      month: new FormControl(''),
      year: new FormControl(''),
      nDays: new FormControl(null),
      description: new FormControl(''),
    });
  }
  
  onSubmit() {
    if (this.planForm.valid) {      
      const formValue: Plan = {
      userID: this.userId(),
      title: this.planForm.value.title,
      destination: this.planForm.value.destination,
      country: this.planForm.value.country,
      city: this.planForm.value.city,
      description: this.planForm.value.description,
      travelers: this.planForm.value.travelers,
      costs: this.planForm.value.costs,
      month: this.planForm.value.month,
      year: this.planForm.value.year,
      nDays: this.planForm.value.nDays,       
    };  
    return formValue;
  }
    return null;
  }

  checkFormValidity(){
    this.isFormValid.set(this.planForm.valid);
    console.log(this.isFormValid())
  }

  onCountryChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.countryService.setSelectedCountry(select.value);
    this.planForm.get('city')?.reset();
  }


  setValue(value: Partial<Plan>) {
    this.planForm.patchValue({
      title: value.title,
      destination: value.destination,
      city: value.city,
      description: value.description,
      travelers: value.travelers,
      month: value.month,
      year: value.year,
      nDays: value.nDays,
    });

    if (value.country) {
      this.planForm.get('country')?.setValue(value.country);
      const fakeEvent = {
        target: { value: value.country },
      } as unknown as Event;
      this.onCountryChange(fakeEvent);
    }
  }

  get(key: string) {
    return this.planForm.get(key); 
  }
  
  resetForm(){
    this.planForm.reset()
  }

}
