import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardDetailsComponent } from './reward-details.component';
import {
  ConfigService,
  ErrorMessageService,
  ILoyalty,
  IReward,
  IVoucherService,
  LoyaltyService,
  MacaronService,
  NotificationService,
  RewardsModule,
  RewardsService,
  SettingsService,
  ThemesService,
  TokenStorage,
  UtilsModule,
  VouchersModule
} from '@perxtech/core';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';

const mockReward: IReward = {
  id: 1,
  name: 'string;',
  description: 'string;',
  subtitle: 'string;',
  validFrom: new Date(),
  favorite: false,
  validTo: new Date(),
  rewardBanner: 'string;',
  merchantImg: 'string;',
  termsAndConditions: 'string;',
  howToRedeem: 'string;',
  displayProperties: {
    CTAButtonTxt: 'btnTxt'
  },
  loyalty: []
};

describe('RewardComponent', () => {
  let component: RewardDetailsComponent;
  let fixture: ComponentFixture<RewardDetailsComponent>;
  const configServiceStub: Partial<ConfigService> = {
    readAppConfig: () => of({
      apiHost: '',
      production: false,
      preAuth: false,
      isWhistler: false,
      baseHref: '',
    })
  };
  const vouchersServiceStub: Partial<IVoucherService> = {
    issueReward: () => of()
  };

  const rewardsServiceStub: Partial<RewardsService> = {
    getReward: () => of(mockReward),
    getAllFavoriteRewards: () => of([])
  };

  const loyaltyServiceStub: Partial<LoyaltyService> = {
    getLoyalties: (): Observable<ILoyalty[]> => of([]),
    getLoyalty: (): Observable<ILoyalty> => of()
  };

  const themeServiceStub: Partial<ThemesService> = {
    getThemeSetting: () => of()
  };

  const tokenStorageStub = {
    getAppInfoProperty: () => null,
    setAppInfoProperty: () => { }
  };

  const settingsServiceStub: Partial<SettingsService> = {
    getRemoteFlagsSettings: () => of()
  };

  const macaronServiceStub: Partial<MacaronService> = {
    getMacaron: () => null
  };

  const notificationServiceStub: Partial<NotificationService> = {
    addSnack: () => { }
  };

  const errorMessageServiceStub: Partial<ErrorMessageService> = {
    getErrorMessageByErrorCode: () => of('')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RewardDetailsComponent],
      imports: [
        MatDialogModule,
        RewardsModule,
        VouchersModule,
        MatButtonModule,
        NoopAnimationsModule,
        RouterTestingModule,
        UtilsModule,
        MatProgressSpinnerModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        { provide: ActivatedRoute, useValue: {
          params: of({ id: 3 }),
          queryParams: of({ isFromCampaignLandingPage: true })
        } },
        { provide: IVoucherService, useValue: vouchersServiceStub },
        { provide: RewardsService, useValue: rewardsServiceStub },
        { provide: ConfigService, useValue: configServiceStub },
        { provide: LoyaltyService, useValue: loyaltyServiceStub },
        { provide: ThemesService, useValue: themeServiceStub },
        { provide: TokenStorage, useValue: tokenStorageStub },
        { provide: SettingsService, useValue: settingsServiceStub },
        { provide: MacaronService, useValue: macaronServiceStub },
        { provide: ErrorMessageService, useValue: errorMessageServiceStub },
        { provide: NotificationService, useValue: notificationServiceStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test queryParam in route', (done) => {
    const activatedRoute: ActivatedRoute = fixture.debugElement.injector.get(ActivatedRoute);

    fixture.detectChanges();

    console.log('-> activatedRoute', activatedRoute);

    activatedRoute.queryParams.subscribe((value) => {
      console.log('value ===== value =====', value);
      expect(value).toEqual({ isFromCampaignLandingPage: true });
      done();
    });
  });
});
