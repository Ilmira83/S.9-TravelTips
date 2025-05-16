import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyPlanFormComponent } from './daily-plan-form.component';

describe('DailyPlanFormComponent', () => {
  let component: DailyPlanFormComponent;
  let fixture: ComponentFixture<DailyPlanFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyPlanFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyPlanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
