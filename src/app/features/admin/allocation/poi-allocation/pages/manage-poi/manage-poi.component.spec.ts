import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePoiComponent } from './manage-poi.component';

describe('ManagePoiComponent', () => {
  let component: ManagePoiComponent;
  let fixture: ComponentFixture<ManagePoiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagePoiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagePoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
