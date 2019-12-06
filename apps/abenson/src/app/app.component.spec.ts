import { TestBed, async, fakeAsync, ComponentFixture, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatDialogModule, MatToolbarModule, MatIconModule, MatSnackBarModule, MatDialog, MatSnackBar } from '@angular/material';
import { NotificationService, AuthenticationService, IVoucherService, ICampaignService, ProfileService, ConfigService } from '@perx/core';
import { HomeComponent } from './home/home.component';
import { TermsAndConditionComponent } from './account/profile-additions/containers/terms-and-condition/terms-and-condition.component';
import { ProfileComponent } from './account/profile/profile.component';
import { ChangeBarangayComponent } from './account/profile/change-barangay/change-barangay.component';
import { ChangePasswordComponent } from './account/change-password/change-password.component';
import { ChangeEmailComponent } from './account/profile/change-email/change-email.component';
import { ChangeCityComponent } from './account/profile/change-city/change-city.component';
import { ChangeStreetAddressComponent } from './account/profile/change-street-address/change-street-address.component';
import { FaqComponent } from './account/profile-additions/containers/faq/faq.component';
import { PrivacyPolicyComponent } from './account/profile-additions/containers/privacy-policy/privacy-policy.component';
import { Location } from '@angular/common';
import { Type } from '@angular/core';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/signup/signup.component';
import { CustomerSupportComponent } from './account/customer-support/customer-support.component';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { SharedDataService } from './services/shared-data.service';
import { of } from 'rxjs';

const configServiceStub: Partial<ConfigService> = {
  readAppConfig: () => of({})
};

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let ntfs: NotificationService;
  let dialog: MatDialog;
  let snackBar: MatSnackBar;
  let location: Location;
  let configService: ConfigService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatDialogModule,
        MatToolbarModule,
        MatIconModule,
        MatSnackBarModule,
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: ConfigService, useValue: configServiceStub }
      ]
    }).compileComponents();
  }));
  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    ntfs = TestBed.get<NotificationService>(NotificationService as Type<NotificationService>);
    dialog = TestBed.get<MatDialog>(MatDialog as Type<MatDialog>);
    snackBar = TestBed.get<MatSnackBar>(MatSnackBar as Type<MatSnackBar>);
    location = TestBed.get<Location>(Location as Type<Location>);
    configService = TestBed.get<ConfigService>(ConfigService as Type<ConfigService>);
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
    const voucherService = {} as IVoucherService;
    const campaingService = {} as ICampaignService;
    const profile = {} as ProfileService;
    const locationTest = {} as Location;
    const shared = {} as SharedDataService;
    const matDialog = {} as MatDialog;
    app.onActivate(new LoginComponent(router, form, auth, notifi));
    expect(app.showHeader).toBeFalsy();
    app.onActivate(new SignUpComponent(form, auth, router));
    expect(app.showHeader).toBeFalsy();
    app.onActivate(new HomeComponent(router, voucherService, campaingService, configService));
    expect(app.showToolbar).toBeTruthy();
    app.onActivate(new TermsAndConditionComponent());
    expect(app.headerTitle).toBe('Terms & Conditions');
    app.onActivate(new ProfileComponent(profile));
    expect(app.headerTitle).toBe('Profile');
    app.onActivate(new ChangeBarangayComponent(form, profile, locationTest));
    expect(app.headerTitle).toBe('Change Barangay');
    app.onActivate(new ChangePasswordComponent(form, shared, router, auth));
    expect(app.headerTitle).toBe('Change PIN Code');
    app.onActivate(new ChangeEmailComponent(form, profile, router));
    expect(app.headerTitle).toBe('Change Email');
    app.onActivate(new ChangeCityComponent(form, profile, locationTest));
    expect(app.headerTitle).toBe('Change City/Municipality');
    app.onActivate(new ChangeStreetAddressComponent(form, profile, locationTest));
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
});
