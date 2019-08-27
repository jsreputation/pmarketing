import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { RewardComponent } from './reward.component';
import { MatIconModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { RewardsService } from '@perx/core';
import { Location } from '@angular/common';
import { of, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Type } from '@angular/core';

describe('RewardComponent', () => {
  let component: RewardComponent;
  let fixture: ComponentFixture<RewardComponent>;

  const reward = {
    id: 1,
    name: 'Get a Free Coke',
    description: '',
    subtitle: '',
    validFrom: null,
    validTo: null,
    rewardThumbnail: '',
    rewardBanner: '',
    merchantImg: '',
    merchantName: 'Pizza Hut',
    termsAndConditions: '',
    howToRedeem: '',
    merchantId: 2
  };
  const rewardsServiceStub = {
    getReward: () => of(reward)
  };
  const locationStub = {
    back: () => {}
  };

  class ActivatedRouteMock {
    get queryParams(): Observable<any> {
      return of({id: 1});
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RewardComponent],
      imports: [
        MatIconModule,
        RouterTestingModule
      ],
      providers: [
        { provide: RewardsService, useValue: rewardsServiceStub },
        { provide: Location, useValue: locationStub },
        { provide: ActivatedRoute, useClass: ActivatedRouteMock },
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

  describe('ngOnInit', () => {
    it('should get id from params, get reward from reward service', fakeAsync(() => {
      const activatedRoute = TestBed.get(ActivatedRoute);
      const activatedRouteSpy = spyOnProperty(activatedRoute, 'queryParams', 'get').and.returnValue(of({id: 1}));

      const rewardsService: RewardsService = fixture.debugElement.injector.get<RewardsService>(RewardsService as Type<RewardsService>);
      const rewardsServiceSpy = spyOn(rewardsService, 'getReward').and.returnValue(of(reward));

      component.ngOnInit();
      tick();
      expect(activatedRouteSpy).toHaveBeenCalled();
      expect(rewardsServiceSpy).toHaveBeenCalled();
      expect(component.reward).toBe(reward);
    }));

    it('should show macaron text and it should be Expiring, save button should be enabled', fakeAsync(() => {
      const rewardValidFrom = new Date();
      const rewardValidTo = new Date();
      const expiringReward = {
        id: 2,
        name: 'Get a Free Coke',
        description: '',
        subtitle: '',
        validFrom: new Date(rewardValidFrom.setHours(rewardValidFrom.getHours() + 96)),
        validTo: new Date(rewardValidTo.setHours(rewardValidTo.getHours() + 36)),
        rewardThumbnail: '',
        rewardBanner: '',
        merchantImg: '',
        merchantName: 'Pizza Hut',
        termsAndConditions: '',
        howToRedeem: '',
        merchantId: 2
      };
      const rewardsService: RewardsService = fixture.debugElement.injector.get<RewardsService>(RewardsService as Type<RewardsService>);
      const rewardsServiceSpy = spyOn(rewardsService, 'getReward').and.returnValue(of(expiringReward));

      component.ngOnInit();
      tick();
      expect(rewardsServiceSpy).toHaveBeenCalled();
      expect(component.reward).toBe(expiringReward);
      expect(component.macaronText).toBe('Expiring');
      expect(component.isExpired).toBe(false);
      expect(component.isExpiring).toBe(true);
      expect(component.isButtonDisabled).toBe(false);
    }));

    it('should show macaron text and it should be Expired, save button should be disabled', fakeAsync(() => {
      const expiringReward = {
        id: 3,
        name: 'Get a Free Coke',
        description: '',
        subtitle: '',
        validFrom: new Date(),
        validTo: new Date('Sun Aug 20 2019 22:09:08'),
        rewardThumbnail: '',
        rewardBanner: '',
        merchantImg: '',
        merchantName: 'Pizza Hut',
        termsAndConditions: '',
        howToRedeem: '',
        merchantId: 2
      };
      const rewardsService: RewardsService = fixture.debugElement.injector.get<RewardsService>(RewardsService as Type<RewardsService>);
      const rewardsServiceSpy = spyOn(rewardsService, 'getReward').and.returnValue(of(expiringReward));

      component.ngOnInit();
      tick();
      fixture.detectChanges();

      expect(rewardsServiceSpy).toHaveBeenCalled();
      expect(component.reward).toBe(expiringReward);

      tick(1000);
      fixture.detectChanges();
      expect(component.macaronText).toBe('Expired');
      expect(component.isExpired).toBe(true);
      expect(component.isButtonDisabled).toBe(true);

    }));

    it('should NOT show macaron text, save button should be enabled', fakeAsync(() => {
      const rewardValidFrom = new Date();
      const rewardValidTo = new Date();
      const expiringReward = {
        id: 4,
        name: 'Get a Free Coke',
        description: '',
        subtitle: '',
        validFrom: new Date(rewardValidFrom.setHours(rewardValidFrom.getHours() + 96)),
        validTo: new Date(rewardValidTo.setHours(rewardValidTo.getHours() + 96)),
        rewardThumbnail: '',
        rewardBanner: '',
        merchantImg: '',
        merchantName: 'Pizza Hut',
        termsAndConditions: '',
        howToRedeem: '',
        merchantId: 2
      };
      const rewardsService: RewardsService = fixture.debugElement.injector.get<RewardsService>(RewardsService as Type<RewardsService>);
      const rewardsServiceSpy = spyOn(rewardsService, 'getReward').and.returnValue(of(expiringReward));

      component.ngOnInit();
      tick();
      expect(rewardsServiceSpy).toHaveBeenCalled();
      expect(component.reward).toBe(expiringReward);

      expect(component.macaronText).toBe('');
      expect(component.isExpired).toBe(false);
      expect(component.isExpiring).toBe(false);
      expect(component.isButtonDisabled).toBe(false);
    }));
  });
});
