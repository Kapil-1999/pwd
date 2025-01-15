import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralFilterReportComponent } from './general-filter-report.component';

describe('GeneralFilterReportComponent', () => {
  let component: GeneralFilterReportComponent;
  let fixture: ComponentFixture<GeneralFilterReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneralFilterReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneralFilterReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
