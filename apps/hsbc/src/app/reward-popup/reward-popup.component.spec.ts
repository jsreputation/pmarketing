import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardPopupComponent } from './reward-popup.component';
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
  const dataMock: IRewardPopupConfig = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardPopupComponent ],
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
});
