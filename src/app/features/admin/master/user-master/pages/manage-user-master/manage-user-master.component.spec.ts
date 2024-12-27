import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUserMasterComponent } from './manage-user-master.component';

describe('ManageUserMasterComponent', () => {
  let component: ManageUserMasterComponent;
  let fixture: ComponentFixture<ManageUserMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageUserMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageUserMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
