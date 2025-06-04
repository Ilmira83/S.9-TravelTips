import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { EditFormComponent } from './edit-form.component';
import { ToastrModule } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('EditFormComponent', () => {
  let component: EditFormComponent;
  let fixture: ComponentFixture<EditFormComponent>;
  let editpage:any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditFormComponent, ToastrModule.forRoot()],
      providers:[provideHttpClientTesting(), provideHttpClient(), {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({}) 
          }
        }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('when title is empty then validation error should appear', () => {
    const titleControl = component.editForm.get('title');
    titleControl?.setValue('');
    titleControl?.markAsTouched();
    fixture.detectChanges();

    const validationEl = fixture.debugElement.query(By.css('[test-id="validation-error"]'));
    expect(validationEl).toBeTruthy();
    expect(validationEl.nativeElement.textContent).toContain('This field is required.');

  });
    it('when month is empty then validation error should appear', () => {
    const titleControl = component.editForm.get('month');
    titleControl?.setValue('');
    titleControl?.markAsTouched();
    fixture.detectChanges();

    const validationEl = fixture.debugElement.query(By.css('[test-id="validation-error"]'));
    expect(validationEl).toBeTruthy();
    expect(validationEl.nativeElement.textContent).toContain('This field is required.');

  });
    it('when year is empty then validation error should appear', () => {
    const titleControl = component.editForm.get('year');
    titleControl?.setValue('');
    titleControl?.markAsTouched();
    fixture.detectChanges();

    const validationEl = fixture.debugElement.query(By.css('[test-id="validation-error"]'));
    expect(validationEl).toBeTruthy();
    expect(validationEl.nativeElement.textContent).toContain('This field is required.');

  });
    it('when city is empty then validation error should appear', () => {
    const titleControl = component.editForm.get('city');
    titleControl?.setValue('');
    titleControl?.markAsTouched();
    fixture.detectChanges();

    const validationEl = fixture.debugElement.query(By.css('[test-id="validation-error"]'));
    expect(validationEl).toBeTruthy();
    expect(validationEl.nativeElement.textContent).toContain('This field is required.');

  });
}); 
