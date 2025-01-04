import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrateSupritendingEngComponent } from './crate-supritending-eng.component';

describe('CrateSupritendingEngComponent', () => {
  let component: CrateSupritendingEngComponent;
  let fixture: ComponentFixture<CrateSupritendingEngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrateSupritendingEngComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrateSupritendingEngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
