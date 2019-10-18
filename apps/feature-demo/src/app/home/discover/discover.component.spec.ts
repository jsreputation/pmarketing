import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverComponent } from './discover.component';
import { NewsFeedComponent } from '../news-feed/news-feed.component';
import { CategoriesComponent } from '../categories/categories.component';
import { RewardsCardsComponent } from '../rewards-cards/rewards-cards.component';
import { CatalogsComponent } from '../catalogs/catalogs.component';
import { CampaignsComponent } from '../campaigns/campaigns.component';
import { MatCardModule, MatIconModule, MatDialogModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxMultiLineEllipsisModule } from 'ngx-multi-line-ellipsis';
import { GameModule, RewardsService, ICampaignService, FeedReaderService, IGameService, RewardsModule } from '@perx/core';
import { of } from 'rxjs';
import { rewards } from 'src/app/rewards.mock';
import { catalogs } from 'src/app/catalogs.mock';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Router } from '@angular/router';
import { Type } from '@angular/core';

describe('DiscoverComponent', () => {
  let component: DiscoverComponent;
  let fixture: ComponentFixture<DiscoverComponent>;
  const rewardsServiceStub = {
    getAllRewards: () => of(rewards),
    getAllCatalogs: () => of(catalogs)
  };

  const campaignServiceStub = {
    getCampaigns: () => of([])
  };
  const feedReaderServiceStub = {
    getFromUrl: () => of([])
  };
  const routerStub = {
    navigate: () => { }
  };
  const gameServiceStub = {
    getGamesFromCampaign: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DiscoverComponent,
        NewsFeedComponent,
        CategoriesComponent,
        RewardsCardsComponent,
        CatalogsComponent,
        CampaignsComponent
      ],
      imports: [
        MatCardModule,
        MatIconModule,
        MatDialogModule,
        RouterTestingModule,
        NgxMultiLineEllipsisModule,
        ScrollingModule,
        GameModule,
        RewardsModule
      ],
      providers: [
        { provide: RewardsService, useValue: rewardsServiceStub },
        { provide: ICampaignService, useValue: campaignServiceStub },
        { provide: FeedReaderService, useValue: feedReaderServiceStub },
        { provide: Router, useValue: routerStub },
        { provide: IGameService, useValue: gameServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go to category with queryParams category name', () => {
    const router: Router = fixture.debugElement.injector.get<Router>(Router as Type<Router>);
    const routerSpy = spyOn(router, 'navigate');
    const category = {
      name: 'all',
      icon: '',
    };
    component.categorySelected(category);
    expect(routerSpy).toHaveBeenCalledWith(['/category'], { queryParams: { category: 'all' } });
  });

  it('should go to reward with reward queryParams id', () => {
    const router: Router = fixture.debugElement.injector.get<Router>(Router as Type<Router>);
    const routerSpy = spyOn(router, 'navigate');
    const reward = {
      id: 1,
      name: 'Test reward',
      description: 'test description',
      subtitle: 'reward',
      validFrom: new Date(),
      validTo: new Date(),
      sellingFrom: new Date(),
      rewardThumbnail: '',
      rewardBanner: '',
      merchantImg: '',
      rewardPrice: [],
      merchantId: 1,
      merchantName: '',
      merchantWebsite: '',
      termsAndConditions: '',
      howToRedeem: '',
      categoryTags: [],
      inventory: null,
    };
    component.rewardSelected(reward);
    expect(routerSpy).toHaveBeenCalledWith(['/reward'], { queryParams: { id: 1 } });
  });

  it('should go to category with queryParams catalog id', () => {
    const router: Router = fixture.debugElement.injector.get<Router>(Router as Type<Router>);
    const routerSpy = spyOn(router, 'navigate');
    const catalog = {
      id: 1,
      name: 'catalog',
      description: 'catalog',
      catalogThumbnail: '',
      catalogBanner: '',
      rewardCount: 0,
      rewards: [],
    };
    component.catalogSelected(catalog);
    expect(routerSpy).toHaveBeenCalledWith(['/category'], { queryParams: { catalog: 1 } });
  });

  it('should go to game with queryParams campaign id', () => {
    const router: Router = fixture.debugElement.injector.get<Router>(Router as Type<Router>);
    const routerSpy = spyOn(router, 'navigate');
    component.campaignSelected(17);
    expect(routerSpy).toHaveBeenCalledWith(['/game'], { queryParams: { id: 17 } });
  });
});
