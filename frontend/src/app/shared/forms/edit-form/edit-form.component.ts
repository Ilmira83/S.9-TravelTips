import { Component, computed, inject, model, output, signal } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { DestinationAPIService } from '../../services/APIs/countryAPIs/country-api.service';
import { BlogsUtilsService } from '../../services/utils/blogs-utils.service';
import { ValidationsComponent } from '../../validations/validations.component';
import { Post } from '../../models/post';
import { ImageLoadFormComponent } from "../image-load-form/image-load-form.component";
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit-form',
  imports: [ReactiveFormsModule, ValidationsComponent, ImageLoadFormComponent],
  templateUrl: './edit-form.component.html',
  styleUrl: './edit-form.component.css'
})
export class EditFormComponent {
  blogUtils = inject(BlogsUtilsService);
  countryService = inject(DestinationAPIService);
  route = inject(ActivatedRoute);

  isFormValid = model<boolean>(false);
  imageDataChanged = output<string>();
  imageData = model<string>(''); 
  modeSignal = signal<'blog' | 'plan'>('blog'); 

  selectedCountry = this.countryService.selectedCountry;
  countriesList = computed(() => this.countryService.apiResponse.value()?.data);

  editForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.editForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      destination: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      travelers: new FormControl(null, [Validators.required]),
      month: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required]),
      nDays: new FormControl(null, [Validators.required]),
      description: new FormControl(''),
      image: new FormControl(),
    });
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
    const mode = params['mode'] === 'plan' ? 'plan' : 'blog';
    this.modeSignal.set(mode);
  });
  }

  onSubmit() {
    if (this.editForm.valid) {
      const formValue: Post = this.editForm.value;
      formValue.image = this.imageData();
      return formValue;
    }
    return null;
  }
  setImageData(data: string){
    this.imageData.set(data);
  }

  onCountryChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.countryService.setSelectedCountry(select.value);
    this.editForm.get('city')?.reset();
  }

  checkFormValidity() {
    this.isFormValid.set(this.editForm.valid);
  }
  get(key: string) {
    return this.editForm.get(key);
  }

  get imagesForm() {
    return this.editForm.get('image') as FormArray;
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    this.editForm.patchValue({ image: file });

    const reader = new FileReader();

    reader.onload = () => {
      this.imageData.set(reader.result as string) 
    };
    reader.readAsDataURL(file);
  }

  setValue(value: Partial<Post>) {
    this.editForm.patchValue(value);
  }



  resetForm() {
    this.editForm.reset();
  }

}
