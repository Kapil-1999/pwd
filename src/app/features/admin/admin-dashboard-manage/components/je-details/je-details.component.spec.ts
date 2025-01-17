import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JeDetailsComponent } from './je-details.component';

describe('JeDetailsComponent', () => {
  let component: JeDetailsComponent;
  let fixture: ComponentFixture<JeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JeDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
