import { Component, output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-blog-form',
  imports: [ReactiveFormsModule],
  templateUrl: './blog-form.component.html',
  styleUrl: './blog-form.component.css'
})
export class BlogFormComponent {
  blogForm:FormGroup;
  imageDataChanged = output<string>();
  imageData:string = '';

  destinations: string[] = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];
  months = Array.from({ length: 12 }, (_, i) =>
      new Date(0, i).toLocaleString('en-US', { month: 'long' })
    );
  years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);
  travelers = Array.from({ length: 100 }, (_, i) => 1 + i);
  days = Array.from({ length: 100 }, (_, i) => 1 + i);


  constructor(private fb: FormBuilder){
    this.blogForm =  this.fb.group({
      title: new FormControl(''),
      destination: new FormControl(''),
      country: new FormControl(null),
      city: new FormControl(null),
      travelers: new FormControl(null),
      month: new FormControl(''),
      year: new FormControl(''),
      nDays: new FormControl(null),
      description: new FormControl(''),
      image: '',
    });
  }

  onSubmit() {
    if (this.blogForm.valid) {
      return this.blogForm.value; 
    }
  }

  onFileSelected(event: Event){
    const file = (event.target as HTMLInputElement).files?.[0];
    this.blogForm.patchValue({image: file});

    if(file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
        this.imageDataChanged.emit(this.imageData);
      };
      reader.readAsDataURL(file);
    }
  }

}
