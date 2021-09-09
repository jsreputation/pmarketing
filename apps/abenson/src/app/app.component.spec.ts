import { async, ComponentFixture, fakeAsync, TestBed, tick, } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  AuthenticationService,
  ConfigService,
  FeedReaderService,
  ICampaignService,
  IGameService, IInstantOutcomeTransactionService,
  InstantOutcomeService,
  IQuestService,
  NotificationService,
  ProfileService,
  RewardsService,
  SettingsService,
  TeamsService,
  ThemesService,
  TokenStorage
} from '@perxtech/core';
import { HomeComponent } from '@perxtech/blackcomb-pages';
import { TermsAndConditionComponent } from './account/profile-additions/containers/terms-and-condition/terms-and-condition.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangeBarangayComponent } from './profile/change-barangay/change-barangay.component';
import { ChangeEmailComponent } from './profile/change-email/change-email.component';
import { ChangeCityComponent } from './profile/change-city/change-city.component';
import { ChangeStreetAddressComponent } from './profile/change-street-address/change-street-address.component';
import { FaqComponent } from './account/profile-additions/containers/faq/faq.component';
import { PrivacyPolicyComponent } from './account/profile-additions/containers/privacy-policy/privacy-policy.component';
import { CurrencyPipe, DatePipe, Location } from '@angular/common';
import { Type } from '@angular/core';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/signup/signup.component';
import { CustomerSupportComponent } from './account/customer-support/customer-support.component';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { SharedDataService } from './services/shared-data.service';

const configServiceStub: Partial<ConfigService> = {
  readAppConfig: () =>
    of({
      apiHost: '',
      production: false,
      preAuth: false,
      isWhistler: false,
      baseHref: '',
    }),
};

const themeServiceStub: Partial<ThemesService> = {
  getActiveTheme: () => of(),
  getThemeSetting: () => of(),
};

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let ntfs: NotificationService;
  let dialog: MatDialog;
  let snackBar: MatSnackBar;
  let location: Location;
  let datePipe: DatePipe;
  let currencyPipe: CurrencyPipe;
  let configService: ConfigService;
  let rewardsService: RewardsService;
  let gamesService: IGameService;
  let translate: TranslateService;
  let themesService: ThemesService;
  let authService: AuthenticationService;
  let instantOutcomeService: InstantOutcomeService;
  let feedService: FeedReaderService;
  let settingsService: SettingsService;
  let profileService: ProfileService;
  let questService: IQuestService;
  let teamsService: TeamsService;
  let instantOutcomeTransactionService: IInstantOutcomeTransactionService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'wallet', redirectTo: '/' },
          { path: 'login', redirectTo: '/' },
        ]),
        MatDialogModule,
        MatToolbarModule,
        MatIconModule,
        MatSnackBarModule,
      ],
      declarations: [AppComponent],
      providers: [
        { provide: ConfigService, useValue: configServiceStub },
        { provide: ThemesService, useValue: themeServiceStub },
        DatePipe,
        CurrencyPipe,
        Title,
        MatDialog,
        { provide: RewardsService, useValue: {} },
        { provide: AuthenticationService, useValue: {} },
        { provide: IGameService, useValue: {} },
        { provide: ProfileService, useValue: {} },
        { provide: TranslateService, useValue: {} },
        { provide: InstantOutcomeService, useValue: {} },
        { provide: FeedReaderService, useValue: {} },
        { provide: SettingsService, useValue: {} },
        { provide: IQuestService, useValue: {} },
        { provide: TeamsService, useValue: {} },
        { provide: IInstantOutcomeTransactionService, useValue: {} },
      ],
    }).compileComponents();
  }));
  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    ntfs = TestBed.get<NotificationService>(
      NotificationService as Type<NotificationService>
    );
    dialog = TestBed.get<MatDialog>(MatDialog as Type<MatDialog>);
    snackBar = TestBed.get<MatSnackBar>(MatSnackBar as Type<MatSnackBar>);
    location = TestBed.get<Location>(Location as Type<Location>);
    datePipe = TestBed.get<DatePipe>(DatePipe as Type<DatePipe>);
    currencyPipe = TestBed.get<CurrencyPipe>(
      CurrencyPipe as Type<CurrencyPipe>
    );
    rewardsService = TestBed.get<RewardsService>(
      RewardsService as Type<RewardsService>
    );
    gamesService = TestBed.get<IGameService>(
      IGameService as Type<IGameService>
    );
    translate = TestBed.get<TranslateService>(
      TranslateService as Type<TranslateService>
    );
    themesService = TestBed.get<ThemesService>(
      ThemesService as Type<ThemesService>
    );
    authService = TestBed.get<AuthenticationService>(
      AuthenticationService as Type<AuthenticationService>
    );
    instantOutcomeService = TestBed.get<InstantOutcomeService>(
      InstantOutcomeService as Type<InstantOutcomeService>
    );
    feedService = TestBed.get<FeedReaderService>(
      FeedReaderService as Type<FeedReaderService>
    );
    settingsService = TestBed.get<SettingsService>(
      SettingsService as Type<SettingsService>
    );
    profileService = TestBed.get<ProfileService>(
      ProfileService as Type<ProfileService>
    );
    configService = TestBed.get<ConfigService>(
      ConfigService as Type<ConfigService>
    );
    questService = TestBed.get<IQuestService>(
      IQuestService as Type<IQuestService>
    );
    teamsService = TestBed.get<TeamsService>(
      TeamsService as Type<TeamsService>
    );
    instantOutcomeTransactionService = TestBed.get<IInstantOutcomeTransactionService>(
      IInstantOutcomeTransactionService as Type<IInstantOutcomeTransactionService>
    );

    app.ngOnInit();
    tick();
  }));
  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should call dialog service', fakeAsync(() => {
    app.ngOnInit();
    const config = { title: 'test' };
    const spyPopup = spyOn(dialog, 'open');
    const spySnack = spyOn(snackBar, 'open');
    ntfs.addPopup(config);
    ntfs.addSnack('test');
    tick();
    expect(spyPopup).toHaveBeenCalled();
    expect(spySnack).toHaveBeenCalled();
  }));

  it('should change show log status', () => {
    const auth = {} as AuthenticationService;
    const router = {} as Router;
    const form = {} as FormBuilder;
    const notifi = {} as NotificationService;
    const campaingService = {} as ICampaignService;
    const tokenService = {} as TokenStorage;
    const profile = {} as ProfileService;
    const locationTest = {} as Location;
    const matDialog = {} as MatDialog;
    const titleService = {} as Title;
    const sharedDataService = {} as SharedDataService;
    app.onActivate(new LoginComponent(router, form, auth, notifi));
    expect(app.showHeader).toBeFalsy();
    // , profile, ntfs //for below signupcomponent but remove temp on disable card section
    app.onActivate(new SignUpComponent(form, auth, router, notifi, sharedDataService));
    expect(app.showHeader).toBeFalsy();
    app.onActivate(
      new HomeComponent(
        rewardsService,
        gamesService,
        router,
        titleService,
        translate,
        themesService,
        configService,
        authService,
        campaingService,
        instantOutcomeService,
        matDialog,
        feedService,
        settingsService,
        profileService,
        currencyPipe,
        tokenService,
        datePipe,
        questService,
        teamsService,
        instantOutcomeTransactionService,
        ntfs
  )
    );
    expect(app.showToolbar).toBeTruthy();
    app.onActivate(new TermsAndConditionComponent());
    expect(app.headerTitle).toBe('Terms & Conditions');
    app.onActivate(new ProfileComponent(profile));
    expect(app.headerTitle).toBe('Profile');
    app.onActivate(new ChangeBarangayComponent(form, profile, locationTest, ntfs));
    expect(app.headerTitle).toBe('Change Barangay');
    app.onActivate(new ChangeEmailComponent(form, profile, locationTest, ntfs));
    expect(app.headerTitle).toBe('Change Email');
    app.onActivate(new ChangeCityComponent(form, profile, ntfs, locationTest));
    expect(app.headerTitle).toBe('Change City/Municipality');
    app.onActivate(
      new ChangeStreetAddressComponent(form, profile, locationTest, ntfs)
    );
    expect(app.headerTitle).toBe('Change Street Address');
    app.onActivate(new FaqComponent());
    expect(app.headerTitle).toBe('FAQ');
    app.onActivate(new PrivacyPolicyComponent());
    expect(app.headerTitle).toBe('Privacy Policy');
    app.onActivate(new CustomerSupportComponent(matDialog));
    expect(app.headerTitle).toBe('Customer Support');
  });

  it('should navigate back', () => {
    const spy = spyOn(location, 'back');
    app.goBack();
    expect(spy).toHaveBeenCalled();
  });

  it('should call goBack', () => {
    const spy = spyOn(app, 'goBack');
    app.goBack();
    expect(spy).toHaveBeenCalled();
  });
});
