import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAppointmentbydoctorformComponent } from './modal-appointmentbydoctorform.component';

describe('ModalAppointmentformComponent', () => {
  let component: ModalAppointmentbydoctorformComponent;
  let fixture: ComponentFixture<ModalAppointmentbydoctorformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAppointmentbydoctorformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalAppointmentbydoctorformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
