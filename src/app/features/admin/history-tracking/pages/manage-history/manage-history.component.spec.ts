import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHistoryComponent } from './manage-history.component';

describe('ManageHistoryComponent', () => {
  let component: ManageHistoryComponent;
  let fixture: ComponentFixture<ManageHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
