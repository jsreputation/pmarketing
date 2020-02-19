import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { Type, Input, Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { of, Observable } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

import {
  RewardsService,
  LoyaltyModule,
  ProfileService,
  LoyaltyService,
  IReward,
  ThemesService,
  ILoyalty
} from '@perx/core';

import { HomeComponent } from './home.component';

// mock the components from perx-core entirely because their dependency on the ellipsis
// module makes it hard to test
@Component({
  selector: 'perx-core-rewards-collection',
  template: ''
})
export class PerxCoreRewardsCollectionMockComponent {
  @Input() public rewardsList: Observable<IReward>;
  @Output() public tapped: EventEmitter<IReward> = new EventEmitter();
}

@Component({
  selector: 'perx-core-rewards-list-tabbed',
  template: ''
})
export class PerxCoreRewardsListTabbedMockComponent {
  @Input() public tabs$: Observable<any>;
  @Output() public tapped: EventEmitter<IReward> = new EventEmitter();
  @Output() public tabChanged: EventEmitter<any> = new EventEmitter();
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const themesServiceStub: Partial<ThemesService> = {
    getThemeSetting: () => of()
  };

  const reward: IReward = {
    id: 149,
    name: '100 HSBC Bonus Points',
    description: '',
    subtitle: '',
    validFrom: new Date('2019-07-04T09:58:07.000Z'),
    validTo: new Date('2020-07-19T16:00:00Z'),
    rewardThumbnail: '',
    rewardBanner: '',
    merchantImg: undefined,
    rewardPrice: [
      {
        id: 23,
        currencyCode: 'MYR',
        price: 0
      }
    ],
    merchantId: undefined,
    merchantName: undefined,
    merchantWebsite: undefined,
    termsAndConditions: '',
    howToRedeem: ''
  };

  const mockLoyalty: ILoyalty = {
    id: 1,
    name: 'test',
    description: 'test',
    beginDate: '',
    membershipTierName: '',
    membershipIdentifier: '1',
    pointsBalance: 1,
    currencyBalance: 1,
    currency: 'SGD'
  };

  const loyaltyServiceStub: Partial<LoyaltyService> = {
    getLoyalties: () => of([mockLoyalty]),
    getLoyalty: () => of(mockLoyalty)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        PerxCoreRewardsCollectionMockComponent,
        PerxCoreRewardsListTabbedMockComponent
      ],
      imports: [
        RouterTestingModule,
        LoyaltyModule,
        // RewardsModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        InfiniteScrollModule
      ],
      providers: [
        {
          provide: LoyaltyService,
          useValue: loyaltyServiceStub
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
            whoAmI: () =>
              of({
                id: 1,
                state: 'active',
                firstName: 'Jane',
                lastName: 'Doe'
              })
          }
        },
        {
          provide: Router,
          useValue: { navigateByUrl: () => { } }
        },
        {
          provide: ThemesService,
          useValue: themesServiceStub
        }
      ]
    }).compileComponents();
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
    const rewardsService: RewardsService = fixture.debugElement.injector.get<RewardsService>(RewardsService as Type<RewardsService>);

    const rewardSpy = spyOn(rewardsService, 'getAllRewards').and.returnValue(
      of([reward])
    );
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
