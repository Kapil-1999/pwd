import { TestBed } from '@angular/core/testing';

import { PoiAllocationService } from './poi-allocation.service';

describe('PoiAllocationService', () => {
  let service: PoiAllocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoiAllocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
