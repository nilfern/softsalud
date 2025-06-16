import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAppointmentformComponent } from './modal-appointmentform.component';

describe('ModalAppointmentformComponent', () => {
  let component: ModalAppointmentformComponent;
  let fixture: ComponentFixture<ModalAppointmentformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAppointmentformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalAppointmentformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
