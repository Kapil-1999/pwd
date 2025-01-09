import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangeDutyAllocationComponent } from './mange-duty-allocation.component';

describe('MangeDutyAllocationComponent', () => {
  let component: MangeDutyAllocationComponent;
  let fixture: ComponentFixture<MangeDutyAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MangeDutyAllocationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MangeDutyAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
