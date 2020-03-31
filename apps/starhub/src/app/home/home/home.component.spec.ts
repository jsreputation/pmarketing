import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { MatToolbarModule, MatTabsModule, MatDialogModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { NoRenewaleInNamePipe } from '../no-renewale-in-name.pipe';
import {
  LoyaltyService,
  IProfile,
  ProfileService,
  FeedReaderService,
  AuthenticationService,
  InstantOutcomeService,
  ICampaignService,
  TokenStorage,
  ConfigService
} from '@perxtech/core';
import { of, throwError } from 'rxjs';
import { loyalty } from 'src/app/loyalty.mock';
import { Type } from '@angular/core';
import { campaigns } from '../../campaigns.mock';
import { Router } from '@angular/router';

const authServiceStub: Partial<AuthenticationService> = {
  isAuthorized: () => of(true),
  getAccessToken: () => of('token')
};

const tokenStorageStub: Partial<TokenStorage> = {
  getAppInfoProperty: () => undefined,
  setAppInfoProperty: () => { }
};

const campaignServiceStub: Partial<ICampaignService> = {
  getCampaigns: () => of(campaigns),
  getCampaign: () => of(campaigns[0]),
};

const configServiceStub: Partial<ConfigService> = {
  readAppConfig: () => of(),
};

const instantOutcomeServiceStub: Partial<InstantOutcomeService> = {
  claim: () => of([])
};

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;
  const loyaltyServiceStub: Partial<LoyaltyService> = {
    getLoyalty: () => of()
  };
  const mockProfile: IProfile = {
    id: 1,
    state: 'active',
    firstName: '',
    lastName: ''
  };

  const profileServiceStub: Partial<ProfileService> = {
    whoAmI: () => of()
  };

  const newsFeedServiceStub: Partial<FeedReaderService> = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, NoRenewaleInNamePipe],
      imports: [
        MatToolbarModule,
        MatTabsModule,
        RouterTestingModule.withRoutes([{
          path: 'error', component: HomeComponent,
        }]),
        MatDialogModule
      ],
      providers: [
        NoRenewaleInNamePipe,
        { provide: LoyaltyService, useValue: loyaltyServiceStub },
        { provide: ProfileService, useValue: profileServiceStub },
        { provide: FeedReaderService, useValue: newsFeedServiceStub },
        { provide: ICampaignService, useValue: campaignServiceStub },
        { provide: InstantOutcomeService, useValue: instantOutcomeServiceStub },
        { provide: AuthenticationService, useValue: authServiceStub },
        { provide: TokenStorage, useValue: tokenStorageStub },
        { provide: ConfigService, useValue: configServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    // @ts-ignore
    global.dataLayerSH = {};
    fixture = TestBed.createComponent(HomeComponent);
    router = TestBed.get<Router>(Router as Type<Router>);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onInit', () => {
    it('should get loyalty from loyaltyService.getLoyalty ', fakeAsync(() => {
      const configService: ConfigService = fixture.debugElement.injector.get<ConfigService>(ConfigService as Type<ConfigService>);
      const loyaltyService: LoyaltyService = fixture.debugElement.injector.get<LoyaltyService>(LoyaltyService as Type<LoyaltyService>);
      const loyaltyServiceSpy = spyOn(loyaltyService, 'getLoyalty').and.returnValue(
        of(loyalty)
      );
      tick();
      component.ngOnInit();
      configService.readAppConfig().subscribe(
        () => {
          expect(loyaltyServiceSpy).toHaveBeenCalled();
          expect(component.loyalty).toBe(loyalty);
        });
    }));

    it('should get profile from profileService.whoAmI ', fakeAsync(() => {
      const configService: ConfigService = fixture.debugElement.injector.get<ConfigService>(ConfigService as Type<ConfigService>);
      const profileService: ProfileService = fixture.debugElement.injector.get<ProfileService>(ProfileService as Type<ProfileService>);
      const profileServiceSpy = spyOn(profileService, 'whoAmI').and.returnValue(
        of(mockProfile)
      );
      tick();
      component.ngOnInit();
      configService.readAppConfig().subscribe(
        () => {
          expect(profileServiceSpy).toHaveBeenCalled();
          expect(component.profile).toBe(mockProfile);
        }
      );
    }));
  });

  describe('getBadge', () => {
    it('should return assets/green-badge.png when null parameter has been passed', () => {
      const badge = component.getBadge(null);
      expect(badge).toBe('assets/green-icon.svg');
    });

    it('should return assets/green-badge.png when green parameter has been passed', () => {
      const badge = component.getBadge('green');
      expect(badge).toBe('assets/green-icon.svg');
    });

    it('should return assets/gold-badge.png when gold parameter has been passed', () => {
      const badge = component.getBadge('gold');
      expect(badge).toBe('assets/gold-icon.svg');
    });

    it('should return assets/platinum-badge.png when platinum parameter has been passed', () => {
      const badge = component.getBadge('platinum');
      expect(badge).toBe('assets/plat-icon.svg');
    });
  });
  it('should handle scroll', fakeAsync(() => {
    component.previousDelta = -10;
    const spy = spyOn(window, 'requestAnimationFrame').and.callThrough();
    component.onScrollCall();
    tick(100);
    expect(spy).toHaveBeenCalled();
    expect(component.top).toBe(-10);
    component.previousDelta = 100;
    component.onScrollCall();
    tick(100);
    expect(component.top).toBe(0);
    component.previousDelta = -1000;
    component.onScrollCall();
    tick(100);
    expect(component.top).toBe(-170);
  }));

  it('should redirect to error screen', fakeAsync(() => {
    const configService: ConfigService = fixture.debugElement.injector.get<ConfigService>(ConfigService as Type<ConfigService>);
    const campaigndService = TestBed.get<ICampaignService>(ICampaignService as Type<ICampaignService>);
    const campaignsServiceSpy = spyOn(campaigndService, 'getCampaigns').and.returnValue(
      throwError({ code: 500, message: 'server failed' })
    );

    const routerSpy = spyOn(router, 'navigateByUrl').and.callThrough();
    component.ngOnInit();
    tick();
    configService.readAppConfig().subscribe(
      () => {
        expect(campaignsServiceSpy).toHaveBeenCalled();
        expect(routerSpy).toHaveBeenCalledWith('error');
      });
  }));

  it('should call ICampaignService.getCampaigns', fakeAsync(() => {
    const configService: ConfigService = fixture.debugElement.injector.get<ConfigService>(ConfigService as Type<ConfigService>);
    const campaigndService = TestBed.get<ICampaignService>(ICampaignService as Type<ICampaignService>);
    const campaignsServiceSpy = spyOn(campaigndService, 'getCampaigns').and.returnValue(of(campaigns));
    component.ngOnInit();
    tick();
    configService.readAppConfig().subscribe(
      () => {
        expect(campaignsServiceSpy).toHaveBeenCalled();
      });
  }));

  it('should call ICampaignService.getCampaign and filter CampaignType.give_reward', fakeAsync(() => {
    const configService: ConfigService = fixture.debugElement.injector.get<ConfigService>(ConfigService as Type<ConfigService>);
    const campaigndService = TestBed.get<ICampaignService>(ICampaignService as Type<ICampaignService>);
    const campaignsServiceSpy = spyOn(campaigndService, 'getCampaigns').and.returnValue(of(campaigns));

    const campaignService = TestBed.get<ICampaignService>(ICampaignService as Type<ICampaignService>);
    const campaignServiceSpy = spyOn(campaignService, 'getCampaign').and.returnValue(of(campaigns[0]));
    component.ngOnInit();
    tick();
    configService.readAppConfig().subscribe(
      () => {
        expect(campaignsServiceSpy).toHaveBeenCalled();
        expect(campaignServiceSpy).toHaveBeenCalled();
      });

  }));

  it('should call ICampaignService.getCampaign and filter CampaignType.game', fakeAsync(() => {
    const configService: ConfigService = fixture.debugElement.injector.get<ConfigService>(ConfigService as Type<ConfigService>);

    const campaigndService = TestBed.get<ICampaignService>(ICampaignService as Type<ICampaignService>);
    const campaignsServiceSpy = spyOn(campaigndService, 'getCampaigns').and.returnValue(of(campaigns));

    const campaignService = TestBed.get<ICampaignService>(ICampaignService as Type<ICampaignService>);
    const campaignServiceSpy = spyOn(campaignService, 'getCampaign').and.returnValue(of(campaigns[0]));
    component.ngOnInit();
    tick();

    configService.readAppConfig().subscribe(
      () => {
        expect(campaignsServiceSpy).toHaveBeenCalled();
        expect(campaignServiceSpy).toHaveBeenCalled();
      });
  }));
});
