import {
  async,
  fakeAsync,
  ComponentFixture,
  TestBed, tick,
} from '@angular/core/testing';
import { Type } from '@angular/core';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import {
  Observable,
  of,
} from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

import {
  AuthenticationService,
  ProfileModule,
  ProfileService,
  LoyaltyService,
  ConfigService,
  ConfigModule,
  IProfile,
  PagesObject,
  NotificationService,
  IConfig,
  ThemesService, SettingsService, BadgeServiceModule
} from '@perxtech/core';

import { AccountComponent } from './account.component';

import { profile } from '../mock/profile.mock';
import { pagesObject } from '../mock/pages.mock';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

describe('AccountComponent', () => {
  const notificationServiceStub: Partial<NotificationService> = {};

  const environment = {
    apiHost: 'https://api.perxtech.io',
    production: false,
    isWhistler: false,
    preAuth: false,
    baseHref: '/'
  };
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let router: Router;
  let auth: AuthenticationService;
  const profileServiceStub: Partial<ProfileService> = {
    whoAmI: (): Observable<IProfile> => of(profile)
  };
  const configServiceStub: Partial<ConfigService> = {
    readAppConfig: <T>(): Observable<IConfig<T>> => of()
  };
  const settingsServiceStub: Partial<SettingsService> = {
    getAccountSettings: (): Observable<PagesObject> => of(pagesObject),
    getRemoteFlagsSettings: () => of()
  };
  const authenticationServiceStub: Partial<AuthenticationService> = {
    logout: () => { }
  };
  const loyalityServiceStub = {
    getLoyalty: () => of({})
  };

  const themeServiceStub: Partial<ThemesService> = {
    getActiveTheme: () => of(),
    getThemeSetting: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountComponent],
      imports: [
        RouterTestingModule.withRoutes([{
          path: 'login',
          component: AccountComponent
        }]),
        ProfileModule,
        MatCardModule,
        MatListModule,
        MatIconModule,
        NoopAnimationsModule,
        TranslateModule.forRoot(),
        ConfigModule.forRoot({ ...environment }),
        BadgeServiceModule.forRoot()
      ],
      providers: [
        { provide: ProfileService, useValue: profileServiceStub },
        { provide: AuthenticationService, useValue: authenticationServiceStub },
        { provide: ConfigService, useValue: configServiceStub },
        { provide: NotificationService, useValue: notificationServiceStub },
        { provide: LoyaltyService, useValue: loyalityServiceStub },
        { provide: ThemesService, useValue: themeServiceStub },
        { provide: SettingsService, useValue: settingsServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    router = TestBed.get<Router>(Router as Type<Router>);
    auth = TestBed.get<AuthenticationService>(AuthenticationService as Type<AuthenticationService>);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch profile', fakeAsync(() => {
    const profileService: ProfileService = fixture.debugElement.injector.get<ProfileService>(ProfileService as Type<ProfileService>);
    const profileServiceSpy = spyOn(profileService, 'whoAmI').and.returnValue(
      of(profile)
    );
    tick();
    component.ngOnInit();
    expect(profileServiceSpy).toHaveBeenCalled();
  }));

  it('should fetch pages', fakeAsync(() => {
    component.ngOnInit();
    expect(component.pages).toBe(pagesObject.pages);
  }));

  it('should logout', () => {
    const routerSpy = spyOn(router, 'navigate');
    const authSpy = spyOn(auth, 'logout');
    component.logout();
    expect(routerSpy).toHaveBeenCalledWith(['/login']);
    expect(authSpy).toHaveBeenCalled();
  });

});
