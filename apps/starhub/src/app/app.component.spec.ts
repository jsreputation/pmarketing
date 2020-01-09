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
  ThemesService
} from '@perx/core';
import { of, BehaviorSubject } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaignType } from '@perx/core';
import { CampaignState } from '@perx/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RewardPopupComponent } from './reward-popup/reward-popup.component';
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
        BrowserAnimationsModule
      ],
      declarations: [
        AppComponent,
        PopupComponent,
        RewardPopupComponent,
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

  describe('onInit', () => {
    // it('should open dialog on init and saveUserAccessToken', () => {
    //   // const notificationService = TestBed.get<NotificationService>(NotificationService);
    //   const dialog = TestBed.get(MatDialog);

    //   const authenticationService = TestBed.get<AuthenticationService>(AuthenticationService as Type<AuthenticationService>);
    //   const authSpy = spyOn(authenticationService, 'saveUserAccessToken');
    //   // spyOnProperty(notificationService, '$popup', 'get')
    //   //   .and.returnValue(of({ title: 'Test' }));
    //   const openSpy = spyOn(dialog, 'open');

    //   fixture.detectChanges();
    //   expect(openSpy).toHaveBeenCalledWith(PopupComponent, { data: { title: 'Test' } });
    //   expect(authSpy).toHaveBeenCalled();
    // });



    // it('should navigate', () => {
    //   const routerSpy = spyOn(router, 'navigate');
    //   component.reward = rewards[0];
    //   component.dialogClosed();
    //   expect(routerSpy).toHaveBeenCalledWith([`/home/vouchers`]);
    //   component.reward = undefined;
    //   component.game = game[0];
    //   component.dialogClosed();
    //   expect(routerSpy).toHaveBeenCalledWith([`/game`], { queryParams: { id: 1 } });
    //   component.reward = undefined;
    //   component.game = undefined;
    //   const spyLog = spyOn(console, 'error');
    //   component.dialogClosed();
    //   expect(spyLog).toHaveBeenCalledWith('Something fishy, we should not be here, without any reward or game');
    // });
  });

  // describe('dialogClosed', () => {
  // it('should navigate to reward if CampaignType is give_reward', fakeAsync(() => {
  //   const campaigndService = TestBed.get<ICampaignService>(ICampaignService as Type<ICampaignService>);
  //   spyOn(campaigndService, 'getCampaigns').and.returnValue(of(campaigns));

  //   const campaignService = TestBed.get<ICampaignService>(ICampaignService as Type<ICampaignService>);
  //   spyOn(campaignService, 'getCampaign').and.returnValue(of(campaigns[1]));

  //   const router: Router = fixture.debugElement.injector.get<Router>(Router as Type<Router>);
  //   const routerSpy = spyOn(router, 'navigate');

  //   component.ngOnInit();
  //   component.dialogClosed();
  //   tick();
  //   expect(routerSpy).toHaveBeenCalledWith(['/reward'], { queryParams: { id: 1 } });
  // }));

  // it('should navigate to game if CampaignType is game', fakeAsync(() => {
  //   const campaigndService = TestBed.get<ICampaignService>(ICampaignService as Type<ICampaignService>);
  //   spyOn(campaigndService, 'getCampaigns').and.returnValue(of(campaigns));

  //   const campaignService = TestBed.get<ICampaignService>(ICampaignService as Type<ICampaignService>);
  //   spyOn(campaignService, 'getCampaign').and.returnValue(of(campaigns[0]));

  //   const gamesService = TestBed.get<IGameService>(IGameService as Type<IGameService>);
  //   spyOn(gamesService, 'getGamesFromCampaign').and.returnValue(of(games));

  //   const router: Router = fixture.debugElement.injector.get<Router>(Router as Type<Router>);
  //   const routerSpy = spyOn(router, 'navigate');

  //   component.ngOnInit();
  //   component.dialogClosed();
  //   tick();
  //   expect(routerSpy).toHaveBeenCalledWith(['/game'], { queryParams: { id: 1 } });
  // }));
  // });
  // it('should handle event', fakeAsync(inject([AnalyticsService, AuthenticationService],
  //   (analytics: AnalyticsService, authenticationService: AuthenticationService) => {
  //     const spy = spyOn(authenticationService, 'getUserAccessToken');
  //     analytics.addEvent({ pageName: 'test', pageType: PageType.detailPage });
  //     component.ngOnInit();
  //     tick();
  //     expect(spy).toHaveBeenCalled();
  //     analytics.addEvent({
  //       pageName: 'test',
  //       pageType: PageType.overlay,
  //       siteSectionLevel2: 'test',
  //       siteSectionLevel3: 'test'
  //     });
  //     tick();
  //     expect(spy).toHaveBeenCalled();
  //   })));
});
