import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAreaComponent } from './manage-area.component';

describe('ManageAreaComponent', () => {
  let component: ManageAreaComponent;
  let fixture: ComponentFixture<ManageAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageAreaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
