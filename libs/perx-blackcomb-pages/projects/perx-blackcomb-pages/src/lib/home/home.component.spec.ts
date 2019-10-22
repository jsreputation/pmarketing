import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ICampaignService, LoyaltyModule, RewardsModule, RewardsService, LoyaltyService, ProfileService, IGameService } from '@perx/core';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material';
import { GamesCollectionComponent } from './games-collection/games-collection.component';

const rewardsServiceStub = {
  getAllRewards: () => of([])
};

const profileService = {
  whoAmI: () => of({})
};

const loyaltyServiceStub = {
  getLoyalties: () => of([])
};

const gameSvcStub = {
};

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const campaignServiceStub = {
    getCampaigns: () => of([])
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, GamesCollectionComponent],
      imports: [
        NoopAnimationsModule,
        MatCardModule,
        LoyaltyModule,
        RewardsModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        { provide: ICampaignService, useValue: campaignServiceStub },
        { provide: RewardsService, useValue: rewardsServiceStub },
        { provide: LoyaltyService, useValue: loyaltyServiceStub },
        { provide: ProfileService, useValue: profileService },
        { provide: IGameService, useValue: gameSvcStub }
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
