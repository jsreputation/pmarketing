import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { RewardDetailComponent } from './reward-detail.component';
import { MatIconModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { LocationShortFormatComponent } from '../../location-short-format/location-short-format.component';
import { ExpireTimerComponent } from '../expire-timer/expire-timer.component';

describe('RewardDetailComponent', () => {
  let component: RewardDetailComponent;
  let fixture: ComponentFixture<RewardDetailComponent>;

  const locationStub = {
    back: () => {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardDetailComponent, LocationShortFormatComponent, ExpireTimerComponent ],
      imports: [
        MatIconModule,
        RouterTestingModule
      ],
      providers: [
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

      component.ngOnInit();
      component.onExpiring();
      tick();
      expect(component.reward).toBe(expiringReward);
      expect(component.macaron.label).toBe('Expiring');
      expect(component.isExpired).toBe(false);
      expect(component.showMacaron).toBe(true);
    }));

    it('should show macaron text and it should be Expired, and should emit hasExpired to set button to disabled', fakeAsync(() => {
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
        merchantId: 2,
        inventory: {
          rewardTotalBalance: 5000,
          rewardTotalLimit: 5000,
        }
      };
      component.reward = expiringReward;
      const emitSpy = spyOn(component.hasExpired, 'emit');
      component.ngOnInit();
      component.setToExpired();
      tick();
      expect(component.reward).toBe(expiringReward);
      expect(component.macaron.label).toBe('Expired');
      expect(component.isExpired).toBe(true);
      expect(emitSpy).toHaveBeenCalledWith(true);
    }));
  });
});
