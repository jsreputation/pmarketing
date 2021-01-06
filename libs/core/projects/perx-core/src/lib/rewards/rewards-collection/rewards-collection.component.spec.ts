import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { RewardsCollectionComponent } from './rewards-collection.component';
import { IReward } from '../models/reward.model';
import { MaterialModule } from '../../shared/material.module';
import { UtilsModule } from '../../utils/utils.module';
import { ThemesService } from '../../utils/themes/themes.service';
import { MatIconModule } from '@angular/material';
import { Config } from '../../config/config';
import { DragScrollModule } from 'ngx-drag-scroll';

describe('RewardsCollectionComponent', () => {
  let component: RewardsCollectionComponent;
  let fixture: ComponentFixture<RewardsCollectionComponent>;

  const themesServiceStub: Partial<ThemesService> = {
    getThemeSetting: () => of()
  };

  const rewards: IReward[] = [
    {
      id: 1,
      name: 'First Reward',
      favorite: false,
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
          price: '1.00',
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
      favorite: false,
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
          price: '2.00',
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
      declarations: [
        RewardsCollectionComponent
      ],
      imports: [
        MaterialModule,
        UtilsModule,
        MatIconModule,
        DragScrollModule
      ],
      providers: [
        { provide: ThemesService, useValue: themesServiceStub },
        { provide: Config }
      ]
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

});
