import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DutyAllocationListComponent } from './duty-allocation-list.component';

describe('DutyAllocationListComponent', () => {
  let component: DutyAllocationListComponent;
  let fixture: ComponentFixture<DutyAllocationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DutyAllocationListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DutyAllocationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
