import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailabilityDoctorListComponent } from './availability-doctor-list.component';

describe('AvailabilityDoctorListComponent', () => {
  let component: AvailabilityDoctorListComponent;
  let fixture: ComponentFixture<AvailabilityDoctorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailabilityDoctorListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvailabilityDoctorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
