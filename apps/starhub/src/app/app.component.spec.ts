import { TestBed, async, ComponentFixture} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatDialogModule, MatSnackBar } from '@angular/material';
import {
  AuthenticationService,
  ProfileService,
  ICampaignService,
  NotificationService,
  PopupComponent,
  IGameService,
  ICampaign,
  // IGame,
  // GameType,
  TokenStorage,
  ThemesService,
  CampaignModule,
  RewardPopupComponent
} from '@perx/core';
import { of, BehaviorSubject } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaignType } from '@perx/core';
import { CampaignState } from '@perx/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ExpireTimerComponent } from './reward/expire-timer/expire-timer.component';
import { game } from './game.mock';
import { AnalyticsService, PageType } from './analytics.service';

describe('AppComponent', () => {
  const analyticsServiceStub: Partial<AnalyticsService> = {
    events$: new BehaviorSubject({ pageName: 'test', pageType: PageType.detailPage }),
    addEvent: () => { }
  };
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  const authenticationServiceStub = {
    saveUserAccessToken: () => { },
    getUserAccessToken: () => 'token',
    isAuthorized: () => of(true),
    getAccessToken: () => of('token')
  };
  const profileServiceStub: Partial<ProfileService> = {
    whoAmI: () => of()
  };

  const campaigns: ICampaign[] = [
    {
      id: 1,
      name: 'abc',
      description: 'abc',
      type: CampaignType.game,
      state: CampaignState.active,
      endsAt: null,
      rewards: [],
      thumbnailUrl: '',
    },
    {
      id: 2,
      name: 'abc',
      description: 'abc',
      type: CampaignType.give_reward,
      state: CampaignState.active,
      endsAt: null,
      rewards: [
        {
          id: 1,
          name: 'reward test',
          description: '',
          subtitle: '',
          validFrom: new Date(),
          validTo: new Date(),
          sellingFrom: undefined,
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
          inventory: undefined,
        }
      ],
      thumbnailUrl: '',
    }
  ];
  const campaignServiceStub: Partial<ICampaignService> = {
    getCampaigns: () => of(campaigns),
    getCampaign: () => of(campaigns[0]),
    issueAll: () => of()
  };
  const gameServiceStub: Partial<IGameService> = {
    getGamesFromCampaign: () => of(game)
  };
  const routerStub: Partial<Router> = {
    navigate: () => Promise.resolve(true),
    navigateByUrl: () => Promise.resolve(true),
    events: of()
  };
  const matSnackBarStub = {
    open: () => { }
  };
  const tokenStorageStub: Partial<TokenStorage> = {
    getAppInfoProperty: () => undefined,
    setAppInfoProperty: () => { }
  };

  const notificationServiceStub: Partial<NotificationService> = {
    $popup: of(),
    $snack: of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatDialogModule,
        BrowserAnimationsModule,
        CampaignModule
      ],
      declarations: [
        AppComponent,
        PopupComponent,
        ExpireTimerComponent
      ],
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceStub },
        { provide: ProfileService, useValue: profileServiceStub },
        { provide: ICampaignService, useValue: campaignServiceStub },
        { provide: IGameService, useValue: gameServiceStub },
        { provide: NotificationService, useValue: notificationServiceStub },
        { provide: ActivatedRoute, useValue: { queryParams: of({ token: 'starhub' }) } },
        { provide: Router, useValue: routerStub },
        { provide: MatSnackBar, useValue: matSnackBarStub },
        { provide: TokenStorage, useValue: tokenStorageStub },
        { provide: AnalyticsService, useValue: analyticsServiceStub },
        { provide: ThemesService, useValue: { getThemeSetting: () => of({}) } }
      ],
    });
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [PopupComponent, RewardPopupComponent]
      }
    }).compileComponents();
  }));

  beforeEach(() => {
    // @ts-ignore
    global.dataLayerSH = {};
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
