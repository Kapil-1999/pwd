import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrateChiefEngComponent } from './crate-chief-eng.component';

describe('CrateChiefEngComponent', () => {
  let component: CrateChiefEngComponent;
  let fixture: ComponentFixture<CrateChiefEngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrateChiefEngComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrateChiefEngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
