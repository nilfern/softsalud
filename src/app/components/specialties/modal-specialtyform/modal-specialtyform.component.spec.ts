import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSpecialtyformComponent } from './modal-specialtyform.component';

describe('ModalSpecialtyformComponent', () => {
  let component: ModalSpecialtyformComponent;
  let fixture: ComponentFixture<ModalSpecialtyformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalSpecialtyformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalSpecialtyformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
