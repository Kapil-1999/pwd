import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoiAllocationListComponent } from './poi-allocation-list.component';

describe('PoiAllocationListComponent', () => {
  let component: PoiAllocationListComponent;
  let fixture: ComponentFixture<PoiAllocationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PoiAllocationListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PoiAllocationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
