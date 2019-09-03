import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverComponent } from './discover.component';
import { NewsFeedComponent } from '../news-feed/news-feed.component';
import { CategoriesComponent } from '../categories/categories.component';
import { RewardsCardsComponent } from '../rewards-cards/rewards-cards.component';
import { CatalogsComponent } from '../catalogs/catalogs.component';
import { CampaignsComponent } from '../campaigns/campaigns.component';
import { MatCardModule, MatIconModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxMultiLineEllipsisModule } from 'ngx-multi-line-ellipsis';
import { RewardsService, FeedReaderService } from '@perx/core';
import { of } from 'rxjs';
import { rewards } from 'src/app/rewards.mock';
import { catalogs } from 'src/app/catalogs.mock';
import { ScrollingModule } from '@angular/cdk/scrolling';

describe('DiscoverComponent', () => {
  let component: DiscoverComponent;
  let fixture: ComponentFixture<DiscoverComponent>;
  const rewardsServiceStub = {
    getAllRewards: () => of(rewards),
    getAllCatalogs: () => of(catalogs)

  };
  const feedReaderServiceStub = {
    getFromUrl: () => of([])
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
        RouterTestingModule,
        NgxMultiLineEllipsisModule,
        ScrollingModule
      ],
      providers: [
        { provide: RewardsService, useValue: rewardsServiceStub },
        { provide: FeedReaderService, useValue: feedReaderServiceStub }
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
});
