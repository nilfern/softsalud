import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPatientformComponent } from './modal-patientform.component';

describe('ModalPatientformComponent', () => {
  let component: ModalPatientformComponent;
  let fixture: ComponentFixture<ModalPatientformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalPatientformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalPatientformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
