import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  AuthenticationService,
  ProfileService,
  ICampaignService,
  NotificationService,
  PopupComponent,
  ICampaign,
  TokenStorage,
  IPopupConfig
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

class MockNotificationService implements Partial<NotificationService> {
  get $popup(): Observable<IPopupConfig> {
    return of();
  }

  get $snack(): Observable<string> {
    return of();
  }
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  const authenticationServiceStub: Partial<AuthenticationService> = {
    saveUserAccessToken: () => { }
  };
  const profileServiceStub: Partial<ProfileService> = {
    whoAmI: () => of()
  };

  const mockCampaigns: ICampaign[] = [
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
  const campaignServiceStub: Partial<ICampaignService> = {
    getCampaigns: () => of(mockCampaigns),
    getCampaign: () => of(mockCampaigns[0])
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
        { provide: AuthenticationService, useValue: authenticationServiceStub },
        { provide: ProfileService, useValue: profileServiceStub },
        { provide: ICampaignService, useValue: campaignServiceStub },
        { provide: NotificationService, useClass: MockNotificationService },
        { provide: ActivatedRoute, useValue: { queryParams: of({ token: 'feature-demo' }) } },
        { provide: Router, useValue: routerStub },
        { provide: MatSnackBar, useValue: matSnackBarStub },
        { provide: TokenStorage, useValue: tokenStorageStub },
        { provide: MatDialogRef, useValue: {} },
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
      const campaignsServiceSpy = spyOn(campaigndService, 'getCampaigns').and.returnValue(of(mockCampaigns));
      component.ngOnInit();
      tick();
      expect(campaignsServiceSpy).toHaveBeenCalled();
    }));

    it('should redirect to error screen', fakeAsync(() => {
      const campaigndService = TestBed.get<ICampaignService>(ICampaignService as Type<ICampaignService>);
      const campaignsServiceSpy = spyOn(campaigndService, 'getCampaigns').and.returnValue(
        throwError({ code: 500, message: 'server failed' })
      );

      const routerFixture: Router = fixture.debugElement.injector.get(Router);
      const routerSpy = spyOn(routerFixture, 'navigateByUrl').and.callThrough();
      component.ngOnInit();
      tick();
      expect(campaignsServiceSpy).toHaveBeenCalled();
      expect(routerSpy).toHaveBeenCalledWith('error');
    }));

  });
});
