import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralReportListComponent } from './general-report-list.component';

describe('GeneralReportListComponent', () => {
  let component: GeneralReportListComponent;
  let fixture: ComponentFixture<GeneralReportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneralReportListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneralReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
