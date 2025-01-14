import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInMapComponent } from './user-in-map.component';

describe('UserInMapComponent', () => {
  let component: UserInMapComponent;
  let fixture: ComponentFixture<UserInMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserInMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserInMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
