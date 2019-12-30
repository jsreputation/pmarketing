import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { NgxMultiLineEllipsisModule } from 'ngx-multi-line-ellipsis';
import { RewardsCollectionComponent } from './rewards-collection.component';
import { IReward } from '../models/reward.model';
import { MaterialModule } from '../../shared/material.module';
import { UtilsModule } from '../../utils/utils.module';
import { ThemesService } from '../../utils/themes/themes.service';

describe('RewardsCollectionComponent', () => {
  let component: RewardsCollectionComponent;
  let fixture: ComponentFixture<RewardsCollectionComponent>;

  const themesServiceStub = {
    getThemeSetting: () => of()
  };

  const rewards: IReward[] = [
    {
      id: 1,
      name: 'First Reward',
      description: 'First Reward Description',
      subtitle: 'First Reward Subtitle',
      validFrom: new Date(),
      validTo: new Date(),
      sellingFrom: new Date(),
      rewardThumbnail: 'perx-core.jpg',
      rewardBanner: 'rewardBanner',
      merchantImg: 'merchantImg',
      rewardPrice: [
        {
          id: 1,
          rewardCampaignId: 1,
          price: 1,
          currencyCode: 'SGD',
          points: 1,
          identifier: '',
        }
      ],
      merchantId: 1,
      merchantName: 'Perx One',
      merchantWebsite: '',
      termsAndConditions: '',
      howToRedeem: '',
      categoryTags: [],
      inventory: {
        rewardTotalBalance: 1,
        rewardTotalLimit: 1,
        rewardLimitPerUserBalance: 1,
      },
    },
    {
      id: 2,
      name: 'Second Reward',
      description: 'Second Reward Description',
      subtitle: 'Second Reward Subtitle',
      validFrom: new Date(),
      validTo: new Date(),
      sellingFrom: new Date(),
      rewardThumbnail: 'perx-logo.jpg',
      rewardBanner: 'rewardBanner',
      merchantImg: 'merchantImg',
      rewardPrice: [
        {
          id: 2,
          rewardCampaignId: 2,
          price: 2,
          currencyCode: 'SGD',
          points: 2,
          identifier: '',
        }
      ],
      merchantId: 2,
      merchantName: 'Perx Two',
      merchantWebsite: '',
      termsAndConditions: '',
      howToRedeem: '',
      categoryTags: [],
      inventory: {
        rewardTotalBalance: 2,
        rewardTotalLimit: 2,
        rewardLimitPerUserBalance: 2,
      },
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardsCollectionComponent ],
      imports: [
        MaterialModule,
        NgxMultiLineEllipsisModule,
        UtilsModule
      ],
      providers: [
        {
          provide: ThemesService,
          useValue: themesServiceStub,
        },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardsCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('If the input has 2 rewards, two rewards should be displayed.', () => {
    component.rewards$ = of(rewards);
    fixture.detectChanges();
    const rewardsElement = fixture.debugElement.queryAll(By.css('mat-card'));
    expect(rewardsElement.length).toBe(2);
  });

  it('If the first reward is being clicked/tapped an event that includes this reward should be emitted.', () => {
    component.rewards$ = of(rewards);

    const tappedSpy = spyOn(component.tapped, 'emit');

    fixture.detectChanges();
    const voucherIssued = fixture.debugElement.queryAll(By.css('mat-card'))[1];
    voucherIssued.triggerEventHandler('click', null);
    expect(tappedSpy).toHaveBeenCalledWith(rewards[1]);
  });

  it('If the reward has a name, the reward name should be displayed', () => {
    component.rewards$ = of(rewards);

    fixture.detectChanges();
    const rewardsName = fixture.debugElement.queryAll(By.css('.subtitle-1'));
    expect(rewardsName[0].nativeElement.textContent.trim()).toBe('First Reward');
    expect(rewardsName[1].nativeElement.textContent.trim()).toBe('Second Reward');
  });

  it('If the reward has a merchant name, the merchant name should be displayed.', () => {
    const rewardsWithMerchantName: IReward[] = [
      {
        id: 1,
        name: 'First Reward',
        description: '',
        subtitle: '',
        validFrom: new Date(),
        validTo: new Date(),
        sellingFrom: new Date(),
        rewardThumbnail: 'rewardThumbnail',
        rewardBanner: 'rewardBanner',
        merchantImg: 'merchantImg',
        rewardPrice: [
          {
            id: 1,
            rewardCampaignId: 1,
            price: 1,
            currencyCode: 'SGD',
            points: 1,
            identifier: '',
          }
        ],
        merchantId: 1,
        merchantName: 'Perx One',
        merchantWebsite: '',
        termsAndConditions: '',
        howToRedeem: '',
        categoryTags: [],
        inventory: {
          rewardTotalBalance: 1,
          rewardTotalLimit: 1,
          rewardLimitPerUserBalance: 1,
        },
      },
      {
        id: 2,
        name: 'Second Reward',
        description: '',
        subtitle: '',
        validFrom: new Date(),
        validTo: new Date(),
        sellingFrom: new Date(),
        rewardThumbnail: 'rewardThumbnail',
        rewardBanner: 'rewardBanner',
        merchantImg: 'merchantImg',
        rewardPrice: [
          {
            id: 2,
            rewardCampaignId: 2,
            price: 2,
            currencyCode: 'SGD',
            points: 2,
            identifier: '',
          }
        ],
        merchantId: 2,
        merchantName: 'Perx Two',
        merchantWebsite: '',
        termsAndConditions: '',
        howToRedeem: '',
        categoryTags: [],
        inventory: {
          rewardTotalBalance: 2,
          rewardTotalLimit: 2,
          rewardLimitPerUserBalance: 2,
        },
      }
    ];

    component.rewards$ = of(rewardsWithMerchantName);

    fixture.detectChanges();
    const rewardsMerchants = fixture.debugElement.queryAll(By.css('mat-card-content'));
    const merchantOneName = rewardsMerchants[0].query(By.css('.description.mat-caption'));
    const merchantTwoName = rewardsMerchants[1].query(By.css('.description.mat-caption'));

    expect(merchantOneName.nativeElement.textContent.trim()).toBe('Perx One');
    expect(merchantTwoName.nativeElement.textContent.trim()).toBe('Perx Two');
  });

  it('If the reward has a description and no merchant name, the description should be displayed.', () => {
    const rewardsWithDescription: IReward[] = [
      {
        id: 1,
        name: 'First Reward',
        description: 'First Reward Description',
        subtitle: '',
        validFrom: new Date(),
        validTo: new Date(),
        sellingFrom: new Date(),
        rewardThumbnail: 'rewardThumbnail',
        rewardBanner: 'rewardBanner',
        merchantImg: 'merchantImg',
        rewardPrice: [
          {
            id: 1,
            rewardCampaignId: 1,
            price: 1,
            currencyCode: 'SGD',
            points: 1,
            identifier: '',
          }
        ],
        merchantId: 1,
        merchantName: '',
        merchantWebsite: '',
        termsAndConditions: '',
        howToRedeem: '',
        categoryTags: [],
        inventory: {
          rewardTotalBalance: 1,
          rewardTotalLimit: 1,
          rewardLimitPerUserBalance: 1,
        },
      },
      {
        id: 2,
        name: 'Second Reward',
        description: 'Second Reward Description',
        subtitle: '',
        validFrom: new Date(),
        validTo: new Date(),
        sellingFrom: new Date(),
        rewardThumbnail: 'rewardThumbnail',
        rewardBanner: 'rewardBanner',
        merchantImg: 'merchantImg',
        rewardPrice: [
          {
            id: 2,
            rewardCampaignId: 2,
            price: 2,
            currencyCode: 'SGD',
            points: 2,
            identifier: '',
          }
        ],
        merchantId: 2,
        merchantName: '',
        merchantWebsite: '',
        termsAndConditions: '',
        howToRedeem: '',
        categoryTags: [],
        inventory: {
          rewardTotalBalance: 2,
          rewardTotalLimit: 2,
          rewardLimitPerUserBalance: 2,
        },
      }
    ];

    component.rewards$ = of(rewardsWithDescription);

    fixture.detectChanges();
    const rewardsMerchants = fixture.debugElement.queryAll(By.css('mat-card-content'));
    const merchantOneName = rewardsMerchants[0].query(By.css('.description.mat-caption'));
    const merchantTwoName = rewardsMerchants[1].query(By.css('.description.mat-caption'));

    expect(merchantOneName.nativeElement.textContent.trim()).toBe('First Reward Des');
    expect(merchantTwoName.nativeElement.textContent.trim()).toBe('Second Reward De');
  });

  it('If the reward has a thumbnail, the thumbnail should be displayed.', () => {
    component.rewards$ = of(rewards);

    fixture.detectChanges();
    const rewardThumb = fixture.debugElement.queryAll(By.css('.mat-card-image'));
    expect(rewardThumb[0].nativeElement.getAttribute('src')).toBe('perx-core.jpg');
    expect(rewardThumb[1].nativeElement.getAttribute('src')).toBe('perx-logo.jpg');
  });

  it('If the reward has a cost, the reward cost should be displayed.', () => {
    component.rewards$ = of(rewards);

    fixture.detectChanges();
    const rewardCost = fixture.debugElement.queryAll(By.css('.points.overline div'));
    expect(rewardCost[0].nativeElement.textContent.trim()).toBe('SGD 1');
    expect(rewardCost[1].nativeElement.textContent.trim()).toBe('SGD 2');
  });
});
