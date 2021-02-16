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
  TokenStorage,
  SettingsService,
  IProfile
} from '@perxtech/core';
import { of } from 'rxjs';
import { MatCardModule, MatDialogModule } from '@angular/material';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {
  CampaignsCollectionComponent,
  CatalogsComponent,
  GamesCollectionComponent
} from '@perxtech/blackcomb-pages';

const profile: IProfile = {
  id: 952,
  state: 'active',
  firstName: 'Lucas',
  lastName: 'Xavier',
  middleName: 'Catherine',
  phone: '1111111111',
  email: 'lucas@perxtech.com',
  birthDate: undefined,
  gender: 'male',
  joinedDate: '2018-10-31T00:00:00.000Z',
  passwordExpiryDate: '2019-09-01T08:35:13.801Z',
  customProperties: {
    mi: 'A',
    city: 'PASIG CITY',
    home: '',
    work: '',
    addr1: 'Blk 1A street 13',
    gender: 'Female',
    company: '',
    barangay: 'CHRISTINE VILL',
    birthday: '19900317',
    lastname: 'Xavier',
    mobileno: '1111111111',
    firstname: 'ARTEMIO',
    spouse_mi: '',
    cardnumber: '123123123123',
    last_visit: '20181031',
    branch_code: '11008',
    branch_name: 'CAINTA 1',
    customer_id: '8010111109440',
    total_visit: '2',
    civil_status: 'SINGLE',
    company_code: '2',
    spouse_first: '',
    email_address: '',
    spouse_lastname: '',
    application_date: '20181031',
    digital_cardnumber: '8720561141910783'
  }
};
const rewardsServiceStub: Partial<RewardsService> = {
  getAllRewards: () => of([]),
  getRewards: () => of([]),
  getCategories: () => of([])
};

const tokenStorageStub: Partial<TokenStorage> = {
  getAppInfoProperty: () => undefined,
  setAppInfoProperty: () => { }
};

const profileService: Partial<ProfileService> = {
  whoAmI: () => of(profile),
  getCustomProperties: () => of ()
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
  getRssFeeds: () => of(),
  getRemoteFlagsSettings: () => of()
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
  loyalty: []
};

const translateServiceStub: Partial<TranslateService> = {
  get: () => of()
};

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;

  const campaignServiceStub: Partial<ICampaignService> = {
    getCampaigns: () => of([]),
    applyReferral: () => of()
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
        { provide: TranslateService, useValue: translateServiceStub },
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
