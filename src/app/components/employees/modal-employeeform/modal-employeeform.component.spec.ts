import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEmployeeformComponent } from './modal-employeeform.component';

describe('ModalEmployeeformComponent', () => {
  let component: ModalEmployeeformComponent;
  let fixture: ComponentFixture<ModalEmployeeformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEmployeeformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalEmployeeformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
