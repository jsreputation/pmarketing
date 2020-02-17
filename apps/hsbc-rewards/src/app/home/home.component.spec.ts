import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { RewardsService, ILoyalty, IProfile, IPrice, IReward, ITabConfig, LoyaltyService } from '@perx/core';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component, Input, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'perx-core-loyalty-summary',
  template: ''
})
class PerxCoreLoyaltySummaryMockComponent {
  @Input()
  public loyalty: Observable<ILoyalty> | undefined;
  @Input()
  public titleFn: (profile: IProfile) => string;
  @Input()
  public subTitleFn: (loyalty: ILoyalty) => string;
  @Input()
  public summaryExpiringFn: (loyalty: ILoyalty) => string;
}

@Component({
  selector: 'perx-core-rewards-collection',
  template: ''
})
class PerxCoreRewardsCollectionMockComponent {
  @Input()
  public displayPriceFn: (rewardPrice: IPrice) => string;
  @Input('rewardsList')
  public rewards$: Observable<IReward[]>;
}

@Component({
  selector: 'perx-core-rewards-list-tabbed',
  template: ''
})
export class RewardsListTabbedMockComponent {
  @Input()
  public displayPriceFn: (rewardPrice: IPrice) => string;
  @Input()
  public tabs$: Observable<ITabConfig[]>;
}

@Component({
  selector: 'mock-host-component',
  template: `<div class="reward-body" infiniteScroll [infiniteScrollContainer]></div>`
})
class MockHostComponent {
  @ViewChild(HomeComponent, { read: undefined, static: true })
  public component: HomeComponent;
}

describe('HomeComponent', () => {
  let mockHostFixture: ComponentFixture<MockHostComponent>;
  let mockHostComponent: MockHostComponent;

  const rewardsServiceStub: Partial<RewardsService> = {
    getAllRewards: () => of([])
  };
  const loyaltyServiceStub: Partial<LoyaltyService> = {
    getLoyalties: () => of([])
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        MockHostComponent,
        PerxCoreLoyaltySummaryMockComponent,
        PerxCoreRewardsCollectionMockComponent,
        RewardsListTabbedMockComponent
      ],
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        InfiniteScrollModule
      ],
      providers: [
        { provide: RewardsService, useValue: rewardsServiceStub },
        { provide: LoyaltyService, useValue: loyaltyServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    mockHostFixture = TestBed.createComponent(MockHostComponent);
    mockHostComponent = mockHostFixture.componentInstance;

    mockHostFixture.detectChanges();
  });

  it('should create', () => {
    expect(mockHostComponent).toBeTruthy();
  });
});
