import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailabilityDetailsComponent } from './availability-details.component';

describe('AvailabilityDetailsComponent', () => {
  let component: AvailabilityDetailsComponent;
  let fixture: ComponentFixture<AvailabilityDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailabilityDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvailabilityDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
