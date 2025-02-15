import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralUserDetailsComponent } from './general-user-details.component';

describe('GeneralUserDetailsComponent', () => {
  let component: GeneralUserDetailsComponent;
  let fixture: ComponentFixture<GeneralUserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneralUserDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneralUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
