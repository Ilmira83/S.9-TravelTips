import { Component, output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-image-load-form',
  imports: [],
  templateUrl: './image-load-form.component.html',
  styleUrl: './image-load-form.component.css'
})
export class ImageLoadFormComponent {
  imageDataChanged = output<string>();
  imageData: string = '';


  imageForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.imageForm = this.fb.group({
      image: new FormControl(),
    });
  }

  onSubmit() {
    if (this.imageForm.valid) {
      const formValue = this.imageForm.value;
      formValue.image = this.imageData;
      return formValue;
    }
    return null;
  }

  get imagesForm() {
    return this.imageForm.get('image');
  }


  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    this.imageForm.patchValue({ image: file });

    const reader = new FileReader();

    reader.onload = () => {
      this.imageData = reader.result as string;
      this.imageDataChanged.emit(this.imageData);
    };
    reader.readAsDataURL(file);
  }

}
