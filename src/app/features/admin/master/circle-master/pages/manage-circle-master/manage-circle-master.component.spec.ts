import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCircleMasterComponent } from './manage-circle-master.component';

describe('ManageCircleMasterComponent', () => {
  let component: ManageCircleMasterComponent;
  let fixture: ComponentFixture<ManageCircleMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageCircleMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageCircleMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
