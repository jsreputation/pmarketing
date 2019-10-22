import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardPopupComponent } from './reward-popup.component';
import { ExpireTimerComponent } from '../reward/expire-timer/expire-timer.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPopupConfig } from '@perx/core';

interface IRewardPopupConfig extends IPopupConfig {
  validTo?: Date;
  timerCallbacks?: TimerCallBack;
}
interface TimerCallBack {
  timerExpired(): void;
  timerExpiring(): void;
}

describe('RewardPopupComponent', () => {
  let component: RewardPopupComponent;
  let fixture: ComponentFixture<RewardPopupComponent>;
  const dataMock: IRewardPopupConfig = {
    timerCallbacks: {
      timerExpired: () => {},
      timerExpiring: () => {}
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardPopupComponent, ExpireTimerComponent ],
      imports: [ MatDialogModule ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: dataMock }
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

  it ('should call timerExpired', () => {
    spyOn(component.data.timerCallbacks, 'timerExpired');
    component.onTimerExpired();
    expect(component.data.timerCallbacks.timerExpired).toHaveBeenCalled();
  });

  it ('should call timerExpiring', () => {
    spyOn(component.data.timerCallbacks, 'timerExpiring');
    component.onExpiring();
    expect(component.data.timerCallbacks.timerExpiring).toHaveBeenCalled();
  });
});
