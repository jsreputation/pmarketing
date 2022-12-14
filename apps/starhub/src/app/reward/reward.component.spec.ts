import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';

import { RewardComponent } from './reward.component';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ConfigService,
  IVoucherService,
  NotificationService,
  RewardsService,
  VoucherState,
  UtilsModule,
  SettingsService
} from '@perxtech/core';
import { LocationShortFormatComponent } from '../location-short-format/location-short-format.component';
import { RewardDetailComponent } from './reward-detail/reward-detail.component';
import { ExpireTimerComponent } from './expire-timer/expire-timer.component';
import { of } from 'rxjs';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { Location } from '@angular/common';
import { Type } from '@angular/core';
import {
  IMacaron,
  MacaronService
} from '../services/macaron.service';
import { AnalyticsService } from '../analytics.service';
import { TranslateService } from '@ngx-translate/core';

const rewardStub = {
  id: 1,
  name: 'Get a Free Coke',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  subtitle: 'string',
  validFrom: new Date('2018-12-16T03:24:00'),
  validTo: new Date('2019-11-17T03:24:00'),
  rewardThumbnail: 'https://picsum.photos/300/200?random=1',
  rewardBanner: 'https://picsum.photos/300/200?random=2',
  merchantImg: 'https://picsum.photos/300/200?random=3',
  merchantName: 'Pizza Hut',
  termsAndConditions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  howToRedeem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  merchantId: 2,
  inventory: {
    rewardLimitPerUserBalance: 0
  },
  loyalty: []
};

const macaronFalseStub: IMacaron = {
  label: '',
  class: '',
  isButtonEnabled: false
};

const macaronTrueStub: IMacaron = {
  label: '',
  class: '',
  isButtonEnabled: true
};

const configServiceStub: Partial<ConfigService> = {
  readAppConfig: () => of()
};

describe('RewardComponent', () => {
  let component: RewardComponent;
  let fixture: ComponentFixture<RewardComponent>;
  let configService: ConfigService;
  let rewardsService: RewardsService;
  let macaronService: MacaronService;
  let analyticsService: AnalyticsService;
  let vouchersService: IVoucherService;
  const rewardsServiceStub: Partial<RewardsService> = {
    getReward: () => of()
  };

  const vouchersServiceStub: Partial<IVoucherService> = {
    issueReward: () => of()
  };
  const locationStub: Partial<Location> = {
    back: () => {
    }
  };
  const routerStub: Partial<Router> = { navigate: () => Promise.resolve(true) };
  const notificationServiceStub: Partial<NotificationService> = { addSnack: () => ({}) };
  const macaronServiceStub: Partial<MacaronService> = { getMacaron: () => null };
  const settingsServiceStub: Partial<SettingsService> = {
    getRemoteFlagsSettings: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RewardComponent, LocationShortFormatComponent, RewardDetailComponent, ExpireTimerComponent],
      imports: [
        MatIconModule,
        UtilsModule,
        MatProgressSpinnerModule,
        RouterTestingModule,
        MatListModule
      ],
      providers: [
        { provide: RewardsService, useValue: rewardsServiceStub },
        { provide: IVoucherService, useValue: vouchersServiceStub },
        {
          provide: ActivatedRoute, useValue: {
            queryParams: of({ id: '1' })
          }
        },
        { provide: Location, useValue: locationStub },
        { provide: Router, useValue: routerStub },
        { provide: NotificationService, useValue: notificationServiceStub },
        { provide: MacaronService, useValue: macaronServiceStub },
        { provide: ConfigService, useValue: configServiceStub },
        { provide: SettingsService, useValue: settingsServiceStub },
        {
          provide: TranslateService, useValue: {
            get: () => of('')
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardComponent);
    configService = fixture.debugElement.injector.get<ConfigService>(ConfigService as Type<ConfigService>);
    rewardsService = fixture.debugElement.injector.get<RewardsService>(RewardsService as Type<RewardsService>);
    macaronService = fixture.debugElement.injector.get<MacaronService>(MacaronService as Type<MacaronService>);
    analyticsService = fixture.debugElement.injector.get<AnalyticsService>(AnalyticsService as Type<AnalyticsService>);
    vouchersService = fixture.debugElement.injector.get<IVoucherService>(IVoucherService as Type<IVoucherService>);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onInit', () => {
    it('should call rewards service and set isButtonEnable to false if rewardLimitPerUserBalance is 0', fakeAsync(() => {
      const rewardsServiceSpy = spyOn(rewardsService, 'getReward').and.returnValue(
        of(rewardStub)
      );
      const macaronServiceSpy = spyOn(macaronService, 'getMacaron').and.returnValue(
        macaronFalseStub
      );
      component.ngOnInit();
      configService.readAppConfig().subscribe(() => {
        expect(rewardsServiceSpy).toHaveBeenCalled();
        expect(macaronServiceSpy).toHaveBeenCalled();
        expect(component.isButtonEnable).toBe(false);
      });
      tick();

    }));

    it('should call rewards service and set isButtonEnable to false if macaron is null', fakeAsync(() => {
      const rewardsServiceSpy = spyOn(rewardsService, 'getReward').and.returnValue(
        of(rewardStub)
      );
      const macaronServiceSpy = spyOn(macaronService, 'getMacaron').and.returnValue(null);
      component.ngOnInit();
      configService.readAppConfig().subscribe(() => {
        expect(rewardsServiceSpy).toHaveBeenCalled();
        expect(macaronServiceSpy).toHaveBeenCalled();
        expect(component.isButtonEnable).toBe(false);
      });
      tick();
    }));

    it('should call rewards service and isButtonEnable should be true', fakeAsync(() => {
      const rewardsServiceSpy = spyOn(rewardsService, 'getReward').and.returnValue(
        of({
          id: 1,
          name: 'Get a Free Coke',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          subtitle: 'string',
          validFrom: new Date('2018-12-16T03:24:00'),
          validTo: new Date('2019-11-17T03:24:00'),
          rewardThumbnail: 'https://picsum.photos/300/200?random=1',
          rewardBanner: 'https://picsum.photos/300/200?random=2',
          merchantImg: 'https://picsum.photos/300/200?random=3',
          merchantName: 'Pizza Hut',
          termsAndConditions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          howToRedeem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          merchantId: 2,
          categoryTags: [{ id: 1, title: 'test' }]
        })
      );
      const macaronServiceSpy = spyOn(macaronService, 'getMacaron').and.returnValue(
        macaronTrueStub
      );

      const analyticsServiceSpy = spyOn(analyticsService, 'addEvent');
      component.ngOnInit();
      configService.readAppConfig().subscribe(() => {
        expect(rewardsServiceSpy).toHaveBeenCalled();
        expect(macaronServiceSpy).toHaveBeenCalled();
        expect(component.isButtonEnable).toBe(true);
        expect(analyticsServiceSpy).toHaveBeenCalled();
      });
      tick();
    }));
  });

  it('should go back', () => {
    const location: Location = fixture.debugElement.injector.get<Location>(Location as Type<Location>);
    const locationSpy = spyOn(location, 'back');
    component.back();
    expect(locationSpy).toHaveBeenCalled();
  });

  it('should save reward', () => {
    component.reward = rewardStub;

    const vouchersServiceSpy = spyOn(vouchersService, 'issueReward').and.returnValue(
      of({
        id: 1,
        reward: {
          id: 1,
          name: '',
          description: '',
          subtitle: '',
          validFrom: new Date(),
          validTo: new Date(),
          sellingFrom: new Date(),
          rewardThumbnail: '',
          rewardBanner: '',
          merchantImg: '',
          rewardPrice: [],
          merchantId: 1,
          merchantName: '',
          merchantWebsite: '',
          termsAndConditions: '',
          howToRedeem: '',
          redemptionType: undefined,
          categoryTags: [],
          inventory: undefined,
          loyalty: []
        },
        state: VoucherState.issued,
        code: 'GFY2019',
        expiry: new Date('2019-09-05T03:24:00'),
      })
    );
    const router: Router = fixture.debugElement.injector.get(Router);
    const routerSpy = spyOn(router, 'navigate');
    component.save();
    expect(vouchersServiceSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['/home/vouchers']);
  });

});
