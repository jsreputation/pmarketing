import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ICampaignService, LoyaltyModule, RewardsModule, RewardsService, LoyaltyService, ProfileService, IGameService } from '@perx/core';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material';
import { GamesCollectionComponent } from './games-collection/games-collection.component';
import { TranslateModule } from '@ngx-translate/core';
import { profile } from '../mock/profile.mock';

const rewardsServiceStub: Partial<RewardsService> = {
  getAllRewards: () => of([])
};

const profileService: Partial<ProfileService> = {
  whoAmI: () => of(profile)
};

const loyaltyServiceStub: Partial<LoyaltyService> = {
  getLoyalties: () => of([])
};

const gameSvcStub: Partial<IGameService> = {};

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const campaignServiceStub: Partial<ICampaignService> = {
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
        RouterTestingModule.withRoutes([]),
        TranslateModule.forRoot()
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
