import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MycalendarComponent } from './mycalendar.component';

describe('MycalendarComponent', () => {
  let component: MycalendarComponent;
  let fixture: ComponentFixture<MycalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MycalendarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MycalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
