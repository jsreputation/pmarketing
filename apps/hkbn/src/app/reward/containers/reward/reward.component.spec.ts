import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardComponent } from './reward.component';
import { MatButtonModule, MatDialog, MatDialogModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationService, RewardsModule, RewardsService } from '@perx/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of } from 'rxjs';
// import 'jasmine'
import { RewardConfirmComponent } from '../../components/reward-confirm/reward-confirm.component';

const mockReward = {
  id: 1,
  name: 'Test Reward',
  description: 'Some description',
  subtitle: 'Subtitle',
  validFrom: new Date(),
  validTo: new Date(),
  rewardThumbnail: 'someurl',
  rewardBanner: 'banner',
  merchantImg: 'image',
  termsAndConditions: 'terms and conditions',
  howToRedeem: 'string'
};

describe('RewardComponent', () => {
  let component: RewardComponent;
  let fixture: ComponentFixture<RewardComponent>;
  let rewardsService: RewardsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        RewardsModule.forRoot({env: {apiHost: ''}}),
        MatButtonModule,
        NoopAnimationsModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [{
        provide: ActivatedRoute, useValue: {paramMap: of(convertToParamMap({id: '1'}))}
      }],
      declarations: [RewardComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardComponent);
    component = fixture.componentInstance;
    rewardsService = TestBed.get(RewardsService);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should get reward by id param', () => {
    const getRewardSpy = spyOn(rewardsService, 'getReward').and.returnValue(of(mockReward));
    const rewardStateSpy = spyOn(component.rewardState$, 'next');
    fixture.detectChanges();
    expect(getRewardSpy).toHaveBeenCalledWith(1);
    expect(rewardStateSpy).toHaveBeenCalledWith(mockReward);
    expect(rewardStateSpy.calls.count()).toBe(1);
  });

  it('should redirect to root, when dialogClosed', () => {
    const router = TestBed.get(Router);
    const routerSpy = spyOn(router, 'navigate');
    component.dialogClosed();
    expect(routerSpy).toHaveBeenCalledWith(['']);
  });

  describe('should open reward confirm dialog, when calling buyReward method', () => {
    let dialog;
    let notificationService;
    let dialogSpy;
    let notificationServiceSpy;

    beforeEach(() => {
      dialog = TestBed.get(MatDialog);
      notificationService = TestBed.get(NotificationService);
      dialogSpy = spyOn(dialog, 'open');
      notificationServiceSpy = spyOn(notificationService, 'addPopup');
    });

    it('should show success popup, when buying confirmed', () => {
      dialogSpy = dialogSpy.and.returnValue({afterClosed: () => of(true)});
      component.buyReward();
      expect(dialogSpy).toHaveBeenCalledWith(RewardConfirmComponent, {
        data: {
          title: '[Reward Title]',
          existingPoints: 49,
          requiredPoints: 20
        }
      });
      expect(notificationServiceSpy).toHaveBeenCalledWith({
        title: '[Reward Title]',
        text: `Points balance: ${29} points`,
        afterClosedCallBack: component
      });
    });

    it('should not open success dialog, when buying canceled', () => {
      dialogSpy = dialogSpy.and.returnValue({afterClosed: () => of(false)});
      component.buyReward();
      expect(notificationServiceSpy.calls.count()).toBe(0);
    });
  });
});
