import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageGeneralReportComponent } from './manage-general-report.component';

describe('ManageGeneralReportComponent', () => {
  let component: ManageGeneralReportComponent;
  let fixture: ComponentFixture<ManageGeneralReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageGeneralReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageGeneralReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
