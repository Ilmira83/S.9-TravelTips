import {
  Component,
  computed,
  effect,
  inject,
  model,
  output,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BlogsUtilsService } from '../../services/utils/blogs-utils.service';
import { Blog } from '../../models/blog';
import { DestinationAPIService } from '../../services/APIs/countryAPIs/country-api.service';
import { ValidationsComponent } from '../../validations/validations.component';

@Component({
  selector: 'app-blog-form',
  imports: [ReactiveFormsModule, ValidationsComponent],
  templateUrl: './blog-form.component.html',
  styleUrl: './blog-form.component.css',
})
export class BlogFormComponent {
  blogUtils = inject(BlogsUtilsService);
  countryService = inject(DestinationAPIService);

  isFormValid = model<boolean>(false);
  imageDataChanged = output<string>();
  imageData: string = '';

  selectedCountry = this.countryService.selectedCountry;
  countriesList = computed(() => this.countryService.apiResponse.value()?.data);

  blogForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.blogForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      destination: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      travelers: new FormControl(null, [Validators.required]),
      month: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required]),
      nDays: new FormControl(null, [Validators.required]),
      description: new FormControl(''),
      image: new FormControl('', []),
    });
  }

  onSubmit() {
    if (this.blogForm.valid) {
      const formValue = this.blogForm.value;
      formValue.image = this.imageData;
      return formValue;
    }
    return null;
  }

  onCountryChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.countryService.setSelectedCountry(select.value);
    this.blogForm.get('city')?.reset();
  }

  checkFormValidity() {
    this.isFormValid.set(this.blogForm.valid);
  }

  get imagesFormArray() {
    return this.blogForm.get('image') as FormArray;
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    this.blogForm.patchValue({ image: file });

    const reader = new FileReader();

    reader.onload = () => {
      this.imageData = reader.result as string;
      this.imageDataChanged.emit(this.imageData);
    };
    reader.readAsDataURL(file);
  }

  setValue(value: Partial<Blog>) {
    this.blogForm.patchValue(value);
  }

  get(key: string) {
    return this.blogForm.get(key);
  }

  resetForm() {
    this.blogForm.reset();
  }
}