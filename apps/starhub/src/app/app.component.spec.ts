import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatDialogModule, MatDialog, MatSnackBar } from '@angular/material';
import {
  AuthenticationService,
  ProfileService,
  CampaignService,
  NotificationService,
  PopupComponent
} from '@perx/core';
import { of, Observable } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { Type } from '@angular/core';
import { CampaignType } from '@perx/core';
import { CampaignState } from '@perx/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RewardPopupComponent } from './reward-popup/reward-popup.component';
import { ExpireTimerComponent } from './reward/expire-timer/expire-timer.component';

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
  const authenticationServiceStub = {
    saveUserAccessToken: () => { }
  };
  const profileServiceStub = {
    whoAmI: () => of()
  };

  const campaigns = [
    {
      id: 1,
      name: 'abc',
      description: 'abc',
      type: CampaignType.game,
      state: CampaignState.active,
      endsAt: '',
      rewards: [],
      thumbnailUrl: '',
    },
    {
      id: 2,
      name: 'abc',
      description: 'abc',
      type: CampaignType.give_reward,
      state: CampaignState.active,
      endsAt: '',
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
    getCampaigns: () => of(),
    getCampaign: () => of()
  };
  const routerStub = {
    navigate: () => { }
  };
  const matSnackBarStub = {
    open: () => { }
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
        { provide: CampaignService, useValue: campaignServiceStub },
        { provide: NotificationService, useClass: MockNotificationService },
        {
          provide: ActivatedRoute, useValue: {
            queryParams: of({ token: 'starhub' })
          }
        },
        { provide: Router, useValue: routerStub },
        { provide: MatSnackBar, useValue: matSnackBarStub }
      ],
    });
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [PopupComponent, RewardPopupComponent]
      }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('onInit', () => {
    it('should open dialog on init and saveUserAccessToken', () => {
      const notificationService = TestBed.get(NotificationService);
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

    it('should call CampaignService.getCampaigns', fakeAsync(() => {
      const campaigndService = TestBed.get<CampaignService>(CampaignService as Type<CampaignService>);
      const campaignsServiceSpy = spyOn(campaigndService, 'getCampaigns').and.returnValue(of(campaigns));
      component.ngOnInit();
      tick();
      expect(campaignsServiceSpy).toHaveBeenCalled();
    }));

    it('should call CampaignService.getCampaign and filter CampaignType.give_reward', fakeAsync(() => {
      const campaigndService = TestBed.get<CampaignService>(CampaignService as Type<CampaignService>);
      const campaignsServiceSpy = spyOn(campaigndService, 'getCampaigns').and.returnValue(of(campaigns));

      const campaignService = TestBed.get<CampaignService>(CampaignService as Type<CampaignService>);
      const campaignServiceSpy = spyOn(campaignService, 'getCampaign').and.returnValue(of(campaigns[1]));
      component.ngOnInit();
      tick();
      expect(campaignsServiceSpy).toHaveBeenCalled();
      expect(campaignServiceSpy).toHaveBeenCalled();
      expect(component.selectedCampaign).toBe(campaigns[1]);
    }));

    it('should call CampaignService.getCampaign and filter CampaignType.game', fakeAsync(() => {
      const campaigndService = TestBed.get<CampaignService>(CampaignService as Type<CampaignService>);
      const campaignsServiceSpy = spyOn(campaigndService, 'getCampaigns').and.returnValue(of(campaigns));

      const campaignService = TestBed.get<CampaignService>(CampaignService as Type<CampaignService>);
      const campaignServiceSpy = spyOn(campaignService, 'getCampaign').and.returnValue(of(campaigns[0]));
      component.ngOnInit();
      tick();
      expect(campaignsServiceSpy).toHaveBeenCalled();
      expect(campaignServiceSpy).toHaveBeenCalled();
      expect(component.selectedCampaign).toBe(campaigns[0]);
    }));

  });

  describe('dialogClosed', () => {
    it('should navigate to reward if CampaignType is give_reward', fakeAsync(() => {
      const campaigndService = TestBed.get<CampaignService>(CampaignService as Type<CampaignService>);
      spyOn(campaigndService, 'getCampaigns').and.returnValue(of(campaigns));

      const campaignService = TestBed.get<CampaignService>(CampaignService as Type<CampaignService>);
      spyOn(campaignService, 'getCampaign').and.returnValue(of(campaigns[1]));

      const router: Router = fixture.debugElement.injector.get<Router>(Router as Type<Router>);
      const routerSpy = spyOn(router, 'navigate');

      component.ngOnInit();
      component.dialogClosed();
      tick();
      expect(routerSpy).toHaveBeenCalledWith(['/reward'], { queryParams: { id: 1 } });
    }));

    it('should navigate to reward if CampaignType is game', fakeAsync(() => {
      const campaigndService = TestBed.get<CampaignService>(CampaignService as Type<CampaignService>);
      spyOn(campaigndService, 'getCampaigns').and.returnValue(of(campaigns));

      const campaignService = TestBed.get<CampaignService>(CampaignService as Type<CampaignService>);
      spyOn(campaignService, 'getCampaign').and.returnValue(of(campaigns[0]));

      const router: Router = fixture.debugElement.injector.get<Router>(Router as Type<Router>);
      const routerSpy = spyOn(router, 'navigate');

      component.ngOnInit();
      component.dialogClosed();
      tick();
      expect(routerSpy).toHaveBeenCalledWith(['/game'], { queryParams: { campaignId: 1 } });
    }));
  });
});
