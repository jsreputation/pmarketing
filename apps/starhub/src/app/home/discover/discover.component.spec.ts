import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverComponent } from './discover.component';
import { NewsFeedComponent } from '../news-feed/news-feed.component';
import { CategoriesComponent } from '../categories/categories.component';
import { RewardsCardsComponent } from '../rewards-cards/rewards-cards.component';
import { CatalogsComponent } from '../catalogs/catalogs.component';
import { CampaignsComponent } from '../campaigns/campaigns.component';
import { MatCardModule, MatIconModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

describe('DiscoverComponent', () => {
  let component: DiscoverComponent;
  let fixture: ComponentFixture<DiscoverComponent>;

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
        RouterTestingModule
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
