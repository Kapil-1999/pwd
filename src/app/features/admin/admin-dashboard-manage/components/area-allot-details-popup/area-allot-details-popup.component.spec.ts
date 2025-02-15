import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaAllotDetailsPopupComponent } from './area-allot-details-popup.component';

describe('AreaAllotDetailsPopupComponent', () => {
  let component: AreaAllotDetailsPopupComponent;
  let fixture: ComponentFixture<AreaAllotDetailsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AreaAllotDetailsPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AreaAllotDetailsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
