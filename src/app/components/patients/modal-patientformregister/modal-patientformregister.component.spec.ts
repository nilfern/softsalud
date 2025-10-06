import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPatientformregisterComponent } from './modal-patientformregister.component';

describe('ModalPatientformregisterComponent', () => {
  let component: ModalPatientformregisterComponent;
  let fixture: ComponentFixture<ModalPatientformregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalPatientformregisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalPatientformregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
