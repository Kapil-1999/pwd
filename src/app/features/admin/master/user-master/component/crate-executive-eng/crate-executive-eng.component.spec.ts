import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrateExecutiveEngComponent } from './crate-executive-eng.component';

describe('CrateExecutiveEngComponent', () => {
  let component: CrateExecutiveEngComponent;
  let fixture: ComponentFixture<CrateExecutiveEngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrateExecutiveEngComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrateExecutiveEngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
