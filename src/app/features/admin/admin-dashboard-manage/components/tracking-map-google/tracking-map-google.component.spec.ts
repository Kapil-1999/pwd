import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingMapGoogleComponent } from './tracking-map-google.component';

describe('TrackingMapGoogleComponent', () => {
  let component: TrackingMapGoogleComponent;
  let fixture: ComponentFixture<TrackingMapGoogleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrackingMapGoogleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrackingMapGoogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
