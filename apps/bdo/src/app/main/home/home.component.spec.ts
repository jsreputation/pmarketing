import { ICampaignService, RewardsService } from '@perxtech/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { PrimaryCatalogComponent } from './primary-catalog/primary-catalog.component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MainRoutingModule } from '../main-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FeatureDealsComponent } from './featured-deals/featured-deals.component';
import { SecondaryCatalogComponent } from './secondary-catalog/secondary-catalog.component';
import { MatIconModule } from '@angular/material/icon';
import { TaggedItemComponent } from '../../shared/components/tagged-item/tagged-item.component';
import { LIST_NEAR_BY } from '../../mock-data/near-by.mock';
import { LIST_FEATURED_DEALS } from '../../mock-data/featured-deals.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { mapRewardsToListItem } from '../../shared/utilities/mapping.util';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const rewardsServiceBdo: Partial<RewardsService> = {
    getRewards() {
      return of();
    },
    nearMe() {
     return of([]);
   }
  };

  const campaignServiceBdo: Partial<ICampaignService> = {
    getCampaigns: () => of(),
    getCampaign: () => of(),
  };
 
  const routerBdo: Partial<Router> = {
    navigate: () => Promise.resolve(true)
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        PrimaryCatalogComponent,
        SecondaryCatalogComponent,
        FeatureDealsComponent,
        TaggedItemComponent,
      ],
      imports: [
        MainRoutingModule,
        MatSidenavModule,
        MatCardModule,
        MatToolbarModule,
        MatIconModule,
        RouterTestingModule,
        MatIconModule
      ],
      providers:[{provide: RewardsService, useValue:rewardsServiceBdo},
        {provide: Router, useValue:routerBdo},
        {provide: ICampaignService, useValue:campaignServiceBdo}]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    component.nearByDeals = mapRewardsToListItem(LIST_NEAR_BY);
    component.featuredDeals = mapRewardsToListItem(LIST_FEATURED_DEALS);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
