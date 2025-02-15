import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaPlotFormComponent } from './area-plot-form.component';

describe('AreaPlotFormComponent', () => {
  let component: AreaPlotFormComponent;
  let fixture: ComponentFixture<AreaPlotFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AreaPlotFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AreaPlotFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
