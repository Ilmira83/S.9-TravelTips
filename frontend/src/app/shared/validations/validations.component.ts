import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-validations',
  imports: [],
  template: `
      @if (control?.touched && control?.errors?.['required']) {
      <p class="validations text-red">This field is required.</p>
    
      }`,
  styles: `  .validation-text{color: red;
             font-size: 13px;}`
})
export class ValidationsComponent {
   @Input() control!: AbstractControl | null;
}
