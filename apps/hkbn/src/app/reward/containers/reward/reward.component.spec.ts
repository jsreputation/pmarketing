import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardComponent } from './reward.component';
import { MatButtonModule, MatDialog, MatDialogModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  NotificationService,
  RewardsModule,
  RewardsService,
  VouchersModule,
  IReward,
  LoyaltyService,
  ILoyalty,
  Voucher,
  VoucherState,
  RedemptionType
} from '@perx/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of, Observable } from 'rxjs';
import { RewardConfirmComponent } from '../../components/reward-confirm/reward-confirm.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

describe('RewardComponent', () => {
  let component: RewardComponent;
  let fixture: ComponentFixture<RewardComponent>;

  const mockReward: IReward = {
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

  const mockVoucher: Voucher = {
    id: 1,
    rewardId: 1,
    state: VoucherState.issued,
    name: '',
    redemptionType: RedemptionType.qr,
    thumbnailImg: '',
    rewardBanner: '',
    merchantImg: '',
    merchantName: '',
    expiry: null,
    description: [],
    redemptionSuccessTxt: '',
    redemptionSuccessImg: '',
  };

  const rewardsServiceStub = {
    getReward: (): Observable<IReward> => of(mockReward),
    issueReward: (): Observable<Voucher> => of(mockVoucher)
  };

  const mockLoyalty: ILoyalty = {
    id: 2,
    name: '',
    description: '',
    beginDate: '',
    membershipTierName: '',
    membershipIdentifier: '',
    pointsBalance: 2,
    currencyBalance: 2,
    currency: '',
  };

  const loyaltyServiceStub = {
    getLoyalties: (): Observable<ILoyalty[]> => of([mockLoyalty]),
    getLoyalty: (): Observable<ILoyalty> => of(mockLoyalty)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        RewardsModule,
        VouchersModule,
        MatButtonModule,
        NoopAnimationsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        {
          provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({ id: '1' })) }
        },
        { provide: RewardsService, useValue: rewardsServiceStub },
        { provide: LoyaltyService, useValue: loyaltyServiceStub }
      ],
      declarations: [RewardComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardComponent);
    component = fixture.componentInstance;
    // rewardsService = TestBed.get(RewardsService);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  // it('should get reward by id param', () => {
  //   // const getRewardSpy = spyOn(rewardsServiceStub, 'getReward').and.returnValue(of(mockReward));
  //   fixture.detectChanges();
  //   // expect(getRewardSpy).toHaveBeenCalledWith(1);
  // });

  it('should redirect to root, when dialogClosed', () => {
    const router = TestBed.get(Router);
    const routerSpy = spyOn(router, 'navigate');
    component.dialogClosed();
    expect(routerSpy).toHaveBeenCalledWith(['/wallet']);
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
      component.ngOnInit();
      fixture.detectChanges();
      const translateService = TestBed.get(TranslateService);
      spyOn(translateService, 'get').and.returnValues(of('Your points balance is'), of('points'));
      dialogSpy = dialogSpy.and.returnValue({ afterClosed: () => of(true) });
      component.buyReward();
      expect(dialogSpy).toHaveBeenCalledWith(RewardConfirmComponent, {
        data: {
          title: 'Test Reward',
          existingPoints: 2,
          requiredPoints: 0
        }
      });
      expect(notificationServiceSpy).toHaveBeenCalledWith({
        title: '[Reward Title]',
        text: `Your points balance is ${29} points`,
        afterClosedCallBack: component
      });
    });

    it('should not open success dialog, when buying canceled', () => {
      dialogSpy = dialogSpy.and.returnValue({ afterClosed: () => of(false) });
      component.buyReward();
      expect(notificationServiceSpy.calls.count()).toBe(0);
    });
  });
});
