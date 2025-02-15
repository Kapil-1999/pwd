import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageViewReportComponent } from './manage-view-report.component';

describe('ManageViewReportComponent', () => {
  let component: ManageViewReportComponent;
  let fixture: ComponentFixture<ManageViewReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageViewReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageViewReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
