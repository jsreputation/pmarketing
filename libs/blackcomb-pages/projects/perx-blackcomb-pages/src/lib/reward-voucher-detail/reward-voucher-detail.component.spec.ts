import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardVoucherDetailComponent } from './reward-voucher-detail.component';
import {
  ConfigService,
  IVoucherService,
  LoyaltyService,
  NotificationService,
  RewardsModule,
  RewardsService,
  SettingsService,
  UtilsModule
} from '@perxtech/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ActivatedRoute,
  convertToParamMap
} from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material';

const rewardsServiceStub: Partial<RewardsService> = {
  getRewards: () => of()
};
const voucherServiceStub: Partial<IVoucherService> = {
  issueReward: () => of()
};
const configServiceStub: Partial<ConfigService> = { readAppConfig: () => of() };
const loyaltyServiceStub = {
  getLoyalties: () => of([{}])
};
const notificationServiceStub: Partial<NotificationService> = { addPopup: () => ({}) };
const activatedRouteStub = {
  paramMap: of(convertToParamMap({ rewardId: 1 })),
  snapshot: {
    paramMap: convertToParamMap({ rewardId: 1 })
  }
};

const settingsServiceStub: Partial<SettingsService> = {
  getRemoteFlagsSettings: () => of()
};

describe('RewardVoucherDetailComponent', () => {
  let component: RewardVoucherDetailComponent;
  let fixture: ComponentFixture<RewardVoucherDetailComponent>;
  history.pushState({ data: '{"id": 1234, "current": "12", "stageLabels": [12, 14]}' }, '', '');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardVoucherDetailComponent ],
      imports: [
        RouterTestingModule,
        RewardsModule,
        UtilsModule,
        MatProgressSpinnerModule,
        MatIconModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: RewardsService, useValue: rewardsServiceStub },
        { provide: IVoucherService, useValue: voucherServiceStub },
        { provide: ConfigService, useValue: configServiceStub },
        { provide: LoyaltyService, useValue: loyaltyServiceStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: NotificationService, useValue: notificationServiceStub },
        { provide: SettingsService, useValue: settingsServiceStub },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardVoucherDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
