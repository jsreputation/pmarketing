import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  ICampaignService,
  InstantOutcomeService,
  LoyaltyModule,
  RewardsModule,
  UtilsModule,
  RewardsService,
  LoyaltyService,
  ProfileService,
  IGameService,
  ThemesService,
  ConfigService,
  IReward,
  AuthenticationService,
  TokenStorage, SettingsService
} from '@perx/core';
import { of } from 'rxjs';
import { MatCardModule, MatDialogModule } from '@angular/material';
import { GamesCollectionComponent } from './games-collection/games-collection.component';
import { TranslateModule } from '@ngx-translate/core';
import { profile } from '../mock/profile.mock';
import { HttpClientModule } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {CampaignsCollectionComponent} from './campaigns-collection/campaigns-collection.component';
import {CatalogsComponent} from '../catalogs/catalogs.component';

const rewardsServiceStub: Partial<RewardsService> = {
  getAllRewards: () => of([]),
  getRewards: () => of([])
};

const tokenStorageStub: Partial<TokenStorage> = {
  getAppInfoProperty: () => undefined,
  setAppInfoProperty: () => { }
};

const profileService: Partial<ProfileService> = {
  whoAmI: () => of(profile)
};
const authServiceStub: Partial<AuthenticationService> = {
  isAuthorized: () => of(true)
};
const loyaltyServiceStub: Partial<LoyaltyService> = {
  getLoyalties: () => of([])
};

const gameSvcStub: Partial<IGameService> = {
  getActiveGames: () => of([])
};

const themesServiceStub: Partial<ThemesService> = { getThemeSetting: () => of() };

const configServiceStub: Partial<ConfigService> = {
  readAppConfig: () => of()
};

const settingsServiceStub: Partial<SettingsService> = {
  readRssFeeds: () => of()
};

const reward: IReward = {
  id: 1,
  name: '',
  description: 'Lorem ipsum',
  subtitle: 'string',
  validFrom: new Date('2018-12-16T03:24:00'),
  validTo: new Date('2019-11-17T03:24:00'),
  rewardBanner: '',
  termsAndConditions: '',
};

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;

  const campaignServiceStub: Partial<ICampaignService> = {
    getCampaigns: () => of([])
  };

  const instantOutcomeServiceStub: Partial<InstantOutcomeService> = {
    claim: () => of([])
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, GamesCollectionComponent, CampaignsCollectionComponent, CatalogsComponent],
      imports: [
        NoopAnimationsModule,
        MatCardModule,
        LoyaltyModule,
        RewardsModule,
        UtilsModule,
        HttpClientModule,
        RouterTestingModule.withRoutes([]),
        TranslateModule.forRoot(),
        InfiniteScrollModule,
        MatDialogModule
      ],
      providers: [
        Title,
        { provide: ICampaignService, useValue: campaignServiceStub },
        { provide: InstantOutcomeService, useValue: instantOutcomeServiceStub },
        { provide: RewardsService, useValue: rewardsServiceStub },
        { provide: LoyaltyService, useValue: loyaltyServiceStub },
        { provide: ProfileService, useValue: profileService },
        { provide: IGameService, useValue: gameSvcStub },
        { provide: ThemesService, useValue: themesServiceStub },
        { provide: ConfigService, useValue: configServiceStub },
        { provide: SettingsService, useValue: settingsServiceStub },
        {
          provide: AuthenticationService,
          useValue: authServiceStub
        },
        { provide: TokenStorage, useValue: tokenStorageStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get<Router>(Router as Type<Router>);
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to reward detail page', () => {
    const routerSpy = spyOn(router, 'navigate');
    component.goToReward(reward);
    expect(routerSpy).toHaveBeenCalledWith([`/reward-detail/${reward.id}`]);
  });
});
