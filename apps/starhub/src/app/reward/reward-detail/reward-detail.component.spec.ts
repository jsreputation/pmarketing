import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { RewardDetailComponent } from './reward-detail.component';
import { MatIconModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { RewardsService, LocationsService } from '@perxtech/core';
import { LocationShortFormatComponent } from '../../location-short-format/location-short-format.component';
import { of } from 'rxjs';
import { ExpireTimerComponent } from '../expire-timer/expire-timer.component';
import { rewards } from 'src/app/rewards.mock';
import { Location } from '@angular/common';
import { Type } from '@angular/core';
import { IMacaron } from 'src/app/services/macaron.service';

const locationsServiceStub: Partial<LocationsService> = {
  getFromMerchant: () => of()
};

describe('RewardDetailComponent', () => {
  let component: RewardDetailComponent;
  let fixture: ComponentFixture<RewardDetailComponent>;
  let location: Location;
  const rewardsServiceStub: Partial<RewardsService> = {
    getReward: () => of()
  };

  const locationStub: Partial<Location> = {
    back: () => { }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RewardDetailComponent, LocationShortFormatComponent, ExpireTimerComponent],
      imports: [
        MatIconModule,
        RouterTestingModule
      ],
      providers: [
        { provide: Location, useValue: locationStub },
        { provide: LocationsService, useValue: locationsServiceStub },
        { provide: RewardsService, useValue: rewardsServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardDetailComponent);
    component = fixture.componentInstance;
    component.reward = rewards[0];
    fixture.detectChanges();
    location = TestBed.get<Location>(Location as Type<Location>);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show macaron text and it should be Expiring', fakeAsync(() => {
    const rewardValidTo = new Date();
    component.macaron = {
      label: '123',
      isButtonEnabled: false,
      class: ''
    };
    const expiringReward = {
      id: 2,
      name: 'Get a Free Coke',
      description: '',
      subtitle: '',
      validFrom: new Date(),
      validTo: new Date(rewardValidTo.setHours(rewardValidTo.getHours() + 35)),
      rewardThumbnail: '',
      rewardBanner: '',
      merchantImg: '',
      merchantName: 'Pizza Hut',
      termsAndConditions: '',
      howToRedeem: '',
      merchantId: 2,
      inventory: {
        rewardTotalBalance: 5000,
        rewardTotalLimit: 5000,
      }
    };
    component.reward = expiringReward;
    component.onExpiring();
    tick();
    expect(component.reward).toBe(expiringReward);
    expect(component.macaron.label).toBe('Expiring');
    expect(component.isExpired).toBe(false);
    expect(component.showMacaron).toBe(true);

    component.macaron = undefined;
    component.onExpiring();
    tick();
    if (component.macaron) {
      expect(component.macaron).toEqual({ label: 'Expiring', class: '', isButtonEnabled: false });
    }
  }));

  it('should navigate back', () => {
    const spy = spyOn(location, 'back');
    component.back();
    expect(spy).toHaveBeenCalled();
  });
  describe('ngOnInit', () => {

    it('should show macaron text and it should be Expiring', fakeAsync(() => {
      const rewardValidTo = new Date();
      const expiringReward = {
        id: 2,
        name: 'Get a Free Coke',
        description: '',
        subtitle: '',
        validFrom: new Date(),
        validTo: new Date(rewardValidTo.setHours(rewardValidTo.getHours() + 35)),
        rewardThumbnail: '',
        rewardBanner: '',
        merchantImg: '',
        merchantName: 'Pizza Hut',
        termsAndConditions: '',
        howToRedeem: '',
        merchantId: 2,
        inventory: {
          rewardTotalBalance: 5000,
          rewardTotalLimit: 5000,
        }
      };
      component.reward = expiringReward;

      component.onExpiring();
      tick();
      expect(component.reward).toBe(expiringReward);
      expect(component.macaron && component.macaron.label).toBe('Expiring');
      expect(component.isExpired).toBe(false);
      expect(component.showMacaron).toBe(true);
    }));
  });

  it('should setToExpired', fakeAsync(() => {
    component.macaron = undefined;
    component.setToExpired();
    tick();
    expect(component.macaron && (component.macaron as IMacaron).label || '').toBe('Expiring');
  }));

  it('should setToExpired and update macaron label', fakeAsync(() => {
    component.macaron = { label: '', class: '', isButtonEnabled: false };
    component.setToExpired();
    tick();
    expect(component.macaron && (component.macaron as IMacaron).label || '').toBe('Expiring');
  }));
});
