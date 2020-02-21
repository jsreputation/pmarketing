import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { RewardComponent } from './reward.component';
import { MatIconModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { RewardsService, NotificationService, IVoucherService, VoucherState } from '@perx/core';
import { LocationShortFormatComponent } from '../location-short-format/location-short-format.component';
import { RewardDetailComponent } from './reward-detail/reward-detail.component';
import { ExpireTimerComponent } from './expire-timer/expire-timer.component';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Type } from '@angular/core';
import {IMacaron, MacaronService} from '../services/macaron.service';
import { AnalyticsService } from '../analytics.service';

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
  }
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

describe('RewardComponent', () => {
  let component: RewardComponent;
  let fixture: ComponentFixture<RewardComponent>;
  const rewardsServiceStub: Partial<RewardsService> = {
    getReward: () => of()
  };

  const vouchersServiceStub: Partial<IVoucherService> = {
    issueReward: () => of()
  };
  const locationStub: Partial<Location> = {
    back: () => { }
  };
  const routerStub: Partial<Router> = { navigate: () => Promise.resolve(true) };
  const notificationServiceStub: Partial<NotificationService> = { addSnack: () => ({}) };
  const macaronServiceStub: Partial<MacaronService> = { getMacaron: () => null };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RewardComponent, LocationShortFormatComponent, RewardDetailComponent, ExpireTimerComponent],
      imports: [
        MatIconModule,
        RouterTestingModule
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
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onInit', () => {
    it('should call rewards service and set isButtonEnable to false if rewardLimitPerUserBalance is 0', fakeAsync(() => {
      const rewardsService: RewardsService = fixture.debugElement.injector.get<RewardsService>(RewardsService as Type<RewardsService>);
      const rewardsServiceSpy = spyOn(rewardsService, 'getReward').and.returnValue(
        of(rewardStub)
      );
      const macaronService: MacaronService = fixture.debugElement.injector.get<MacaronService>(MacaronService as Type<MacaronService>);
      const macaronServiceSpy = spyOn(macaronService, 'getMacaron').and.returnValue(
        macaronFalseStub
      );
      component.ngOnInit();
      tick();
      expect(rewardsServiceSpy).toHaveBeenCalled();
      expect(macaronServiceSpy).toHaveBeenCalled();
      expect(component.isButtonEnable).toBe(false);
    }));

    it('should call rewards service and set isButtonEnable to false if macaron is null', fakeAsync(() => {
      const rewardsService: RewardsService = fixture.debugElement.injector.get<RewardsService>(RewardsService as Type<RewardsService>);
      const rewardsServiceSpy = spyOn(rewardsService, 'getReward').and.returnValue(
        of(rewardStub)
      );
      const macaronService: MacaronService = fixture.debugElement.injector.get<MacaronService>(MacaronService as Type<MacaronService>);
      const macaronServiceSpy = spyOn(macaronService, 'getMacaron').and.returnValue(null);
      component.ngOnInit();
      tick();
      expect(rewardsServiceSpy).toHaveBeenCalled();
      expect(macaronServiceSpy).toHaveBeenCalled();
      expect(component.isButtonEnable).toBe(false);
    }));

    it('should call rewards service and isButtonEnable should be true', fakeAsync(() => {
      const rewardsService: RewardsService = fixture.debugElement.injector.get<RewardsService>(RewardsService as Type<RewardsService>);
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
          categoryTags: [{id: 1, title: 'test'}]
        })
      );
      const macaronService: MacaronService = fixture.debugElement.injector.get<MacaronService>(MacaronService as Type<MacaronService>);
      const macaronServiceSpy = spyOn(macaronService, 'getMacaron').and.returnValue(
        macaronTrueStub
      );
      const analyticsService: AnalyticsService = fixture.debugElement.injector.get<AnalyticsService>(
        AnalyticsService as Type<AnalyticsService>);
      const analyticsServiceSpy = spyOn(analyticsService, 'addEvent');
      component.ngOnInit();
      tick();
      expect(rewardsServiceSpy).toHaveBeenCalled();
      expect(macaronServiceSpy).toHaveBeenCalled();
      expect(component.isButtonEnable).toBe(true);
      expect(analyticsServiceSpy).toHaveBeenCalled();
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
    const vouchersService: IVoucherService = fixture.debugElement.injector
      .get<IVoucherService>(IVoucherService as Type<IVoucherService>);
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
