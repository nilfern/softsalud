import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmenbydoctorListComponent } from './appointmenbydoctor-list.component';

describe('AppointmenbydoctorListComponent', () => {
  let component: AppointmenbydoctorListComponent;
  let fixture: ComponentFixture<AppointmenbydoctorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmenbydoctorListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppointmenbydoctorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
