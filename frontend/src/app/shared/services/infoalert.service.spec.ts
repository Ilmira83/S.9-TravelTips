import { TestBed } from '@angular/core/testing';
import { InfoalertService } from './infoalert.service';

describe('InfoalertService', () => {
  let service: InfoalertService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InfoalertService]
    });
    service = TestBed.inject(InfoalertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update message when showInfo is called', () => {
    const testMessage = 'Test informational message';
    service.showInfo(testMessage);
    expect(service.mess()).toBe(testMessage);
  });

  it('should have default daily plan message', () => {
    expect(service.messDailyPlan).toContain('Complete your travel plan by adding a short description');
  });
});
