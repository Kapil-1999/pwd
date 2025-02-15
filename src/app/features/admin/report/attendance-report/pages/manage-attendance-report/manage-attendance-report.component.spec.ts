import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAttendanceReportComponent } from './manage-attendance-report.component';

describe('ManageAttendanceReportComponent', () => {
  let component: ManageAttendanceReportComponent;
  let fixture: ComponentFixture<ManageAttendanceReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageAttendanceReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageAttendanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
