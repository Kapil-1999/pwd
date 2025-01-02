import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLiveTrackingComponent } from './manage-live-tracking.component';

describe('ManageLiveTrackingComponent', () => {
  let component: ManageLiveTrackingComponent;
  let fixture: ComponentFixture<ManageLiveTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageLiveTrackingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageLiveTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
