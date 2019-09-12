import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { RewardsService, ILoyalty, IProfile, IPrice, IReward, ITabConfig, LoyaltyService } from '@perx/core';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component, Input } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'perx-core-loyalty-summary',
  template: ''
})
class PerxCoreLoyaltySummaryMockComponent {
  @Input()
  public loyalty: Observable<ILoyalty> | undefined;
  @Input()
  public titleFn: (profile: IProfile) => string;
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

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const rewardsServiceStub = {
    getAllRewards: () => of([])
  };
  const loyaltyServiceStub = {
    getLoyalties: () => of([])
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        PerxCoreLoyaltySummaryMockComponent,
        PerxCoreRewardsCollectionMockComponent,
        RewardsListTabbedMockComponent
      ],
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: RewardsService, useValue: rewardsServiceStub },
        { provide: LoyaltyService, useValue: loyaltyServiceStub }
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
});
