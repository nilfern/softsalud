import { TestBed } from '@angular/core/testing';

import { AvailabilityDoctorService } from './availability-doctor.service';

describe('AvailabilityDoctorService', () => {
  let service: AvailabilityDoctorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvailabilityDoctorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
