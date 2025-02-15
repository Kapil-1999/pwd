import { TestBed } from '@angular/core/testing';

import { DistrictReportService } from './district-report.service';

describe('DistrictReportService', () => {
  let service: DistrictReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DistrictReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
