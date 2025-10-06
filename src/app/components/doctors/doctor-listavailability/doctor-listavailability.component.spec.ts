import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorListavailabilityComponent } from './doctor-listavailability.component';

describe('EmployeeListComponent', () => {
  let component: DoctorListavailabilityComponent;
  let fixture: ComponentFixture<DoctorListavailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorListavailabilityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorListavailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
