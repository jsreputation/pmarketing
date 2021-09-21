import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
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
  ThemesService, SettingsService,  BadgeServiceModule,
} from '@perxtech/core';
import { AccountComponent } from './account.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';

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
  const profileServiceStub: Partial<ProfileService> = {
    whoAmI: (): Observable<IProfile> => of()
  };
  const configServiceStub: Partial<ConfigService> = {
    readAppConfig: <T>(): Observable<IConfig<T>> => of()
  };
  const settingsServiceStub: Partial<SettingsService> = {
    getAccountSettings: (): Observable<PagesObject> => of(),
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
        BadgeServiceModule.forRoot(),
        HttpClientModule
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
