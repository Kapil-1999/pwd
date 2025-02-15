import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCountingComponent } from './employee-counting.component';

describe('EmployeeCountingComponent', () => {
  let component: EmployeeCountingComponent;
  let fixture: ComponentFixture<EmployeeCountingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeCountingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeCountingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
