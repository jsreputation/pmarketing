import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';
import {
  RewardsService,
  LoyaltyModule,
  RewardsModule,
  ProfileService,
  LoyaltyService
} from '@perx/core';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Type } from '@angular/core';
import { Router } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const reward = {
    id: 149,
    name: '100 HSBC Bonus Points',
    description: null,
    subtitle: null,
    validFrom: new Date('2019-07-04T09:58:07.000Z'),
    validTo: new Date('2020-07-19T16:00:00Z'),
    rewardThumbnail: '',
    rewardBanner: '',
    merchantImg: null,
    rewardPrice: [
      {
        rewardCurrency: 'MYR',
        rewardAmount: '0.0'
      }
    ],
    merchantId: null,
    merchantName: null,
    merchantWebsite: null,
    termsAndConditions: null,
    howToRedeem: '',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        RouterTestingModule,
        LoyaltyModule,
        RewardsModule,
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: LoyaltyService,
          useValue: {
            getLoyalties: () => of({
              id: 1,
              name: 'test',
              description: 'test',
              beginDate: '',
              membershipTierName: '',
              membershipIdentifier: '1',
              pointsBalance: 1,
              currencyBalance: 1,
              currency: 'SGD',
            })
          }
        },
        {
          provide: RewardsService,
          useValue: {
            getAllRewards: () => of()
          }
        },
        {
          provide: ProfileService,
          useValue: {
            whoAmI: () => of({
              id: 1,
              state: 'active',
              firstName: 'Jane',
              lastName: 'Doe',
            })
          }
        },
        { provide: Router, useValue: { navigateByUrl: () => {} } },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all rewards on onInit', fakeAsync(() => {
    const rewardsService: RewardsService = fixture.debugElement.injector.get<RewardsService>
      (RewardsService as Type<RewardsService>);

    const rewardSpy = spyOn(rewardsService, 'getAllRewards').and.returnValue(of([reward]));
    component.ngOnInit();
    tick();
    expect(rewardSpy).toHaveBeenCalled();
  }));

  it('should navigate to reward detail based on the passed reward', () => {
    const router: Router = fixture.debugElement.injector.get(Router);
    const routerSpy = spyOn(router, 'navigateByUrl');
    component.rewardClicked(reward);
    expect(routerSpy).toHaveBeenCalledWith('reward-detail/149');
  });
});
