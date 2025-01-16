import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictFilterComponent } from './district-filter.component';

describe('DistrictFilterComponent', () => {
  let component: DistrictFilterComponent;
  let fixture: ComponentFixture<DistrictFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DistrictFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DistrictFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
