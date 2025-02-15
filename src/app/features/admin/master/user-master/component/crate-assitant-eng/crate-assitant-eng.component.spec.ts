import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrateAssitantEngComponent } from './crate-assitant-eng.component';

describe('CrateAssitantEngComponent', () => {
  let component: CrateAssitantEngComponent;
  let fixture: ComponentFixture<CrateAssitantEngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrateAssitantEngComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrateAssitantEngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
