import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { RewardDetailComponent } from './reward-detail.component';
import { MatIconModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { RewardsService } from '@perx/core';
import { LocationShortFormatComponent } from '../../location-short-format/location-short-format.component';
import { of } from 'rxjs';
import { Type } from '@angular/core';

describe('RewardDetailComponent', () => {
  let component: RewardDetailComponent;
  let fixture: ComponentFixture<RewardDetailComponent>;

  const rewardsServiceStub = {
    getReward: () => of()
  };
  const locationStub = {
    back: () => {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardDetailComponent, LocationShortFormatComponent ],
      imports: [
        MatIconModule,
        RouterTestingModule
      ],
      providers: [
        { provide: RewardsService, useValue: rewardsServiceStub },
        { provide: Location, useValue: locationStub },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should get reward from reward service base on the id input', fakeAsync(() => {
      const rewardValidFrom = new Date();
      const rewardValidTo = new Date();
      const reward = {
        id: 2,
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
      component.rewardId = 1;
      const rewardsService: RewardsService = fixture.debugElement.injector.get<RewardsService>(RewardsService as Type<RewardsService>);
      const rewardsServiceSpy = spyOn(rewardsService, 'getReward').and.returnValue(of(reward));

      component.ngOnInit();
      tick();
      expect(rewardsServiceSpy).toHaveBeenCalled();
      expect(component.reward).toBe(reward);
    }));

    it('should show macaron text and it should be Expiring', fakeAsync(() => {
      component.rewardId = 1;
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
      expect(component.showMacaron).toBe(true);
    }));

    it('should show macaron text and it should be Expired, and should emit hasExpired to set button to disabled', fakeAsync(() => {
      component.rewardId = 3;
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
      const emitSpy = spyOn(component.hasExpired, 'emit');

      component.ngOnInit();
      tick();
      expect(rewardsServiceSpy).toHaveBeenCalled();
      expect(component.reward).toBe(expiringReward);
      expect(component.macaronText).toBe('Expired');
      expect(component.isExpired).toBe(true);
      expect(emitSpy).toHaveBeenCalledWith(true);
    }));

    it('should NOT show macaron text', fakeAsync(() => {
      component.rewardId = 4;
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
      expect(component.showMacaron).toBe(false);
    }));
  });
});
