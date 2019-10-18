import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { ICampaignService, LoyaltyModule, RewardsModule, RewardsService, LoyaltyService, ProfileService } from '@perx/core';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material';
import { GamesCollectionComponent } from './games-collection/games-collection.component';
import { Directive } from '@angular/core';

@Directive({
  selector: '[routerLink]'
})
class DummyRouterLinkDirective { }

const rewardsServiceStub = {
  getAllRewards: () => of([])
};

const profileService = {
  whoAmI: () => of({})
};

const loyaltyServiceStub = {
  getLoyalties: () => of([])
};

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const router = {
    navigate: jasmine.createSpy('navigate')
  };

  const campaignServiceStub = {
    getCampaigns: () => of([])
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, GamesCollectionComponent, DummyRouterLinkDirective],
      imports: [
        NoopAnimationsModule,
        MatCardModule,
        LoyaltyModule,
        RewardsModule
      ],
      providers: [
        { provide: Router, useValue: router },
        { provide: ICampaignService, useValue: campaignServiceStub },
        { provide: RewardsService, useValue: rewardsServiceStub },
        { provide: LoyaltyService, useValue: loyaltyServiceStub },
        { provide: ProfileService, useValue: profileService }
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
