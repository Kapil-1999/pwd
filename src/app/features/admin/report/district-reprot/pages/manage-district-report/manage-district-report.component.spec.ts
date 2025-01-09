import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDistrictReportComponent } from './manage-district-report.component';

describe('ManageDistrictReportComponent', () => {
  let component: ManageDistrictReportComponent;
  let fixture: ComponentFixture<ManageDistrictReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageDistrictReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageDistrictReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
