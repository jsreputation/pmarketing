import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardPopupComponent } from './reward-popup.component';
import { ExpireTimerComponent } from '../reward/expire-timer/expire-timer.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('RewardPopupComponent', () => {
  let component: RewardPopupComponent;
  let fixture: ComponentFixture<RewardPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardPopupComponent, ExpireTimerComponent ],
      imports: [ MatDialogModule ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
