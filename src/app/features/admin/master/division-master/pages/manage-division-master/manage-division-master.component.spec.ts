import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDivisionMasterComponent } from './manage-division-master.component';

describe('ManageDivisionMasterComponent', () => {
  let component: ManageDivisionMasterComponent;
  let fixture: ComponentFixture<ManageDivisionMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageDivisionMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageDivisionMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
