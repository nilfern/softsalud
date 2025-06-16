import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDoctorformComponent } from './modal-doctorform.component';

describe('ModalDoctorformComponent', () => {
  let component: ModalDoctorformComponent;
  let fixture: ComponentFixture<ModalDoctorformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDoctorformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalDoctorformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
