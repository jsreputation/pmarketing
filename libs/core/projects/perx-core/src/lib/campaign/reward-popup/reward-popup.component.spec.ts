import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardPopupComponent } from './reward-popup.component';
import { ExpireTimerComponent } from './expire-timer/expire-timer.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// import { Type } from '@angular/core';
import { IPopupConfig } from '../../utils/popup/popup.component';

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
  const dialogRef: Partial<MatDialogRef<RewardPopupComponent>> = { close: () => { } };

  const dataMock: IRewardPopupConfig = {
    timerCallbacks: {
      timerExpired: () => { },
      timerExpiring: () => { }
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RewardPopupComponent, ExpireTimerComponent],
      imports: [MatDialogModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: dataMock },
        { provide: MatDialogRef, useValue: dialogRef }
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

  it('should call timerExpired', () => {
    if (!component.data.timerCallbacks) {
      return;
    }
    jest.spyOn(component.data.timerCallbacks, 'timerExpired').mockImplementation(() => {});
    component.onTimerExpired();
    expect(component.data.timerCallbacks.timerExpired).toHaveBeenCalled();
  });

  it('should call timerExpiring', () => {
    if (!component.data.timerCallbacks) {
      return;
    }
    jest.spyOn(component.data.timerCallbacks, 'timerExpiring').mockImplementation(() => {});
    component.onExpiring();
    expect(component.data.timerCallbacks.timerExpiring).toHaveBeenCalled();
  });

  it('should close dialog onClose', () => {
    const dialogRefLocal = TestBed.get(MatDialogRef);
    const spy = jest.spyOn(dialogRefLocal, 'close');
    component.onClose();
    expect(spy).toBeCalledTimes(1);
  });

  describe('buttonPressed', () => {
    it('should close dialog onClose', () => {
      const dialogRefLocal = TestBed.get(MatDialogRef);
      const spy = jest.spyOn(dialogRefLocal, 'close');
      component.buttonPressed();
      expect(spy).toHaveBeenCalled();
    });
  });

  it('should IRewardPopupConfig have data', () => {
    TestBed.resetTestingModule();

    const dataStub: IRewardPopupConfig = {
      disableOverlayClose: true,
      text: 'Text',
      buttonTxt: 'Close',
      imageUrl: 'http://perxtech.com/logo.jpg',
      validTo: new Date('Wed Nov 20 2019 14:23:31'),
    };

    TestBed.configureTestingModule({
      declarations: [RewardPopupComponent, ExpireTimerComponent],
      imports: [MatDialogModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: dataStub },
        { provide: MatDialogRef, useValue: { close: () => { } } }
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(RewardPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.text).toBe('Text');
    expect(component.buttonTxt).toBe('Close');
    expect(component.imageUrl).toBe('http://perxtech.com/logo.jpg');
    expect(component.validTo).toEqual(new Date('Wed Nov 20 2019 14:23:31'));
  });
});
