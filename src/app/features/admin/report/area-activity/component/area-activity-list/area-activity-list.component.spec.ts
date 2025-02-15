import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaActivityListComponent } from './area-activity-list.component';

describe('AreaActivityListComponent', () => {
  let component: AreaActivityListComponent;
  let fixture: ComponentFixture<AreaActivityListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AreaActivityListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AreaActivityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
