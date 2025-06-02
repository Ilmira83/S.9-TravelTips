import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageLoadFormComponent } from './image-load-form.component';

describe('ImageLoadFormComponent', () => {
  let component: ImageLoadFormComponent;
  let fixture: ComponentFixture<ImageLoadFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageLoadFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageLoadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
