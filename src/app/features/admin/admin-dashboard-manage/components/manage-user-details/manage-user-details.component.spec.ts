import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUserDetailsComponent } from './manage-user-details.component';

describe('ManageUserDetailsComponent', () => {
  let component: ManageUserDetailsComponent;
  let fixture: ComponentFixture<ManageUserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageUserDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
