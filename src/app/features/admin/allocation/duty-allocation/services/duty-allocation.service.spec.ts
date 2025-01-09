import { TestBed } from '@angular/core/testing';

import { DutyAllocationService } from './duty-allocation.service';

describe('DutyAllocationService', () => {
  let service: DutyAllocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DutyAllocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
