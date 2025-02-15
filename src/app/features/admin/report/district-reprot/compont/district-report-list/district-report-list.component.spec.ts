import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictReportListComponent } from './district-report-list.component';

describe('DistrictReportListComponent', () => {
  let component: DistrictReportListComponent;
  let fixture: ComponentFixture<DistrictReportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DistrictReportListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DistrictReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
