import { TestBed } from '@angular/core/testing';

import { GeneralReportService } from './general-report.service';

describe('GeneralReportService', () => {
  let service: GeneralReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
