import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentByDoctorComponent } from './appointmentByDoctor.component';

describe('AppointmentComponent', () => {
  let component: AppointmentByDoctorComponent;
  let fixture: ComponentFixture<AppointmentByDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentByDoctorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppointmentByDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
