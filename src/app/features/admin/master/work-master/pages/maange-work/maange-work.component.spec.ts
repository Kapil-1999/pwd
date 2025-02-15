import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaangeWorkComponent } from './maange-work.component';

describe('MaangeWorkComponent', () => {
  let component: MaangeWorkComponent;
  let fixture: ComponentFixture<MaangeWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaangeWorkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaangeWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
