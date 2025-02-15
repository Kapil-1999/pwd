import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDistrictMasterComponent } from './manage-district-master.component';

describe('ManageDistrictMasterComponent', () => {
  let component: ManageDistrictMasterComponent;
  let fixture: ComponentFixture<ManageDistrictMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageDistrictMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageDistrictMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
