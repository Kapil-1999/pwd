import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageZoneMasterComponent } from './manage-zone-master.component';

describe('ManageZoneMasterComponent', () => {
  let component: ManageZoneMasterComponent;
  let fixture: ComponentFixture<ManageZoneMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageZoneMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageZoneMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
