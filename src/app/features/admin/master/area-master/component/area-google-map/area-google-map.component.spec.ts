import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaGoogleMapComponent } from './area-google-map.component';

describe('AreaGoogleMapComponent', () => {
  let component: AreaGoogleMapComponent;
  let fixture: ComponentFixture<AreaGoogleMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AreaGoogleMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AreaGoogleMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
