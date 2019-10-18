import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatDialogModule, MatDialog, MatSnackBar } from '@angular/material';
import {
  AuthenticationService,
  ProfileService,
  ICampaignService,
  NotificationService,
  PopupComponent,
  // IGameService,
  ICampaign,
  // IGame,
  // GameType,
  TokenStorage
} from '@perx/core';
import { of, Observable, throwError } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { Type } from '@angular/core';
import { CampaignType } from '@perx/core';
import { CampaignState } from '@perx/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RewardPopupComponent } from './reward-popup/reward-popup.component';
import { ExpireTimerComponent } from './reward/expire-timer/expire-timer.component';
import { rewards } from './rewards.mock';
import { game } from './game.mock';

class MockNotificationService {
  get $popup(): Observable<any> {
    return of(true);
  }

  get $snack(): Observable<any> {
    return of(true);
  }
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  const authenticationServiceStub = {
    saveUserAccessToken: () => { }
  };
  const profileServiceStub = {
    whoAmI: () => of()
  };

  const campaigns: ICampaign[] = [
    {
      id: 1,
      name: 'abc',
      description: 'abc',
      type: CampaignType.game,
      state: CampaignState.active,
      endsAt: undefined,
      rewards: [],
      thumbnailUrl: '',
    },
    {
      id: 2,
      name: 'abc',
      description: 'abc',
      type: CampaignType.give_reward,
      state: CampaignState.active,
      endsAt: undefined,
      rewards: [
        {
          id: 1,
          name: 'reward test',
          description: '',
          subtitle: '',
          validFrom: new Date(),
          validTo: new Date(),
          sellingFrom: null,
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
          inventory: null,
        }
      ],
      thumbnailUrl: '',
    }
  ];
  const campaignServiceStub = {
    getCampaigns: () => of(campaigns),
    getCampaign: () => of(campaigns[0])
  };
  const routerStub = {
    navigate: () => { },
    navigateByUrl: () => { },
    events: of()
  };
  const matSnackBarStub = {
    open: () => { }
  };

  // const games: IGame[] = [{
  //   id: 1,
  //   campaignId: 1,
  //   type: GameType.pinata,
  //   remainingNumberOfTries: 1,
  //   config: {
  //     stillImg: '',
  //     brokenImg: '',
  //     nbTaps: 5
  //   },
  //   texts: {
  //   },
  //   results: {
  //   }
  // }];
  // const gameServiceStub = {
  //   getGamesFromCampaign: () => of([])
  // };
  const tokenStorageStub = {
    getAppInfoProperty: () => null,
    setAppInfoProperty: () => { }
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
        // TokenStorage,
        { provide: AuthenticationService, useValue: authenticationServiceStub },
        { provide: ProfileService, useValue: profileServiceStub },
        { provide: ICampaignService, useValue: campaignServiceStub },
        { provide: NotificationService, useClass: MockNotificationService },
        {
          provide: ActivatedRoute, useValue: {
            queryParams: of({ token: 'starhub' })
          }
        },
        { provide: Router, useValue: routerStub },
        { provide: MatSnackBar, useValue: matSnackBarStub },
        // { provide: IGameService, useValue: gameServiceStub },
        { provide: TokenStorage, useValue: tokenStorageStub }
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
    router = TestBed.get<Router>(Router as Type<Router>);
    component = fixture.debugElement.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('onInit', () => {
    it('should open dialog on init and saveUserAccessToken', () => {
      const notificationService = TestBed.get<NotificationService>(NotificationService);
      const dialog = TestBed.get(MatDialog);

      const authenticationService = TestBed.get<AuthenticationService>(AuthenticationService as Type<AuthenticationService>);
      const authSpy = spyOn(authenticationService, 'saveUserAccessToken');
      spyOnProperty(notificationService, '$popup', 'get')
        .and.returnValue(of({ title: 'Test' }));
      const openSpy = spyOn(dialog, 'open');

      fixture.detectChanges();
      expect(openSpy).toHaveBeenCalledWith(PopupComponent, { data: { title: 'Test' } });
      expect(authSpy).toHaveBeenCalled();
    });

    it('should call ICampaignService.getCampaigns', fakeAsync(() => {
      const campaigndService = TestBed.get<ICampaignService>(ICampaignService as Type<ICampaignService>);
      const campaignsServiceSpy = spyOn(campaigndService, 'getCampaigns').and.returnValue(of(campaigns));
      component.ngOnInit();
      tick();
      expect(campaignsServiceSpy).toHaveBeenCalled();
    }));

    // it('should call ICampaignService.getCampaign and filter CampaignType.give_reward', fakeAsync(() => {
    //   const campaigndService = TestBed.get<ICampaignService>(ICampaignService as Type<ICampaignService>);
    //   const campaignsServiceSpy = spyOn(campaigndService, 'getCampaigns').and.returnValue(of(campaigns));

    //   const campaignService = TestBed.get<ICampaignService>(ICampaignService as Type<ICampaignService>);
    //   const campaignServiceSpy = spyOn(campaignService, 'getCampaign').and.returnValue(of(campaigns[1]));
    //   component.ngOnInit();
    //   tick();
    //   expect(campaignsServiceSpy).toHaveBeenCalled();
    //   expect(campaignServiceSpy).toHaveBeenCalled();
    //   // expect(component.rewar).toBe(campaigns[1]);
    // }));

    // it('should call ICampaignService.getCampaign and filter CampaignType.game', fakeAsync(() => {
    //   const campaigndService = TestBed.get<ICampaignService>(ICampaignService as Type<ICampaignService>);
    //   const campaignsServiceSpy = spyOn(campaigndService, 'getCampaigns').and.returnValue(of(campaigns));

    //   const campaignService = TestBed.get<ICampaignService>(ICampaignService as Type<ICampaignService>);
    //   const campaignServiceSpy = spyOn(campaignService, 'getCampaign').and.returnValue(of(campaigns[0]));
    //   component.ngOnInit();
    //   tick();
    //   expect(campaignsServiceSpy).toHaveBeenCalled();
    //   expect(campaignServiceSpy).toHaveBeenCalled();
    //   // expect(component.selectedCampaign).toBe(campaigns[0]);
    // }));

    it('should redirect to error screen', fakeAsync(() => {
      const campaigndService = TestBed.get<ICampaignService>(ICampaignService as Type<ICampaignService>);
      const campaignsServiceSpy = spyOn(campaigndService, 'getCampaigns').and.returnValue(
        throwError({ code: 500, message: 'server failed' })
      );

      const routerSpy = spyOn(router, 'navigateByUrl').and.callThrough();
      component.ngOnInit();
      tick();
      expect(campaignsServiceSpy).toHaveBeenCalled();
      expect(routerSpy).toHaveBeenCalledWith('error');
    }));

    it('should navigate', () => {
      const routerSpy = spyOn(router, 'navigate');
      component.reward = rewards[0];
      component.dialogClosed();
      expect(routerSpy).toHaveBeenCalledWith([`/reward`], { queryParams: { id: component.reward.id } });
      component.reward = null;
      component.game = game[0];
      component.dialogClosed();
      expect(routerSpy).toHaveBeenCalledWith([`/game`], { queryParams: { id: 1 } });
      component.reward = null;
      component.game = null;
      const spyLog = spyOn(console, 'error');
      component.dialogClosed();
      expect(spyLog).toHaveBeenCalledWith('Something fishy, we should not be here, without any reward or game');
    });
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
});
