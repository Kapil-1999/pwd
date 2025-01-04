import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrateJuniorEngComponent } from './crate-junior-eng.component';

describe('CrateJuniorEngComponent', () => {
  let component: CrateJuniorEngComponent;
  let fixture: ComponentFixture<CrateJuniorEngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrateJuniorEngComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrateJuniorEngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
