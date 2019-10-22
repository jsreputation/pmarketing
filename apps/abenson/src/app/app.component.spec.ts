import { TestBed, async, fakeAsync, ComponentFixture, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatDialogModule, MatToolbarModule, MatIconModule, MatSnackBarModule, MatDialog, MatSnackBar } from '@angular/material';
import { NotificationService } from '@perx/core';
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

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let ntfs: NotificationService;
  let dialog: MatDialog;
  let snackBar: MatSnackBar;
  let location: Location;
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
    }).compileComponents();
  }));
  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    ntfs = TestBed.get<NotificationService>(NotificationService as Type<NotificationService>);
    dialog = TestBed.get<MatDialog>(MatDialog as Type<MatDialog>);
    snackBar = TestBed.get<MatSnackBar>(MatSnackBar as Type<MatSnackBar>);
    location = TestBed.get<Location>(Location as Type<Location>);
    app.ngOnInit();
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
    app.onActivate(new LoginComponent(null, null, null, null));
    expect(app.showHeader).toBeFalsy();
    app.onActivate(new SignUpComponent(null, null, null));
    expect(app.showHeader).toBeFalsy();
    app.onActivate(new HomeComponent(null, null, null));
    expect(app.showToolbar).toBeTruthy();
    app.onActivate(new TermsAndConditionComponent());
    expect(app.headerTitle).toBe('Terms & Conditions');
    app.onActivate(new ProfileComponent(null));
    expect(app.headerTitle).toBe('Profile');
    app.onActivate(new ChangeBarangayComponent(null, null, null));
    expect(app.headerTitle).toBe('Change Barangay');
    app.onActivate(new ChangePasswordComponent(null, null, null, null));
    expect(app.headerTitle).toBe('Change PIN Code');
    app.onActivate(new ChangeEmailComponent(null, null, null));
    expect(app.headerTitle).toBe('Change Email');
    app.onActivate(new ChangeCityComponent(null, null, null));
    expect(app.headerTitle).toBe('Change City/Municipality');
    app.onActivate(new ChangeStreetAddressComponent(null, null, null));
    expect(app.headerTitle).toBe('Change Street Address');
    app.onActivate(new FaqComponent());
    expect(app.headerTitle).toBe('FAQ');
    app.onActivate(new PrivacyPolicyComponent());
    expect(app.headerTitle).toBe('Privacy Policy');
    app.onActivate(new CustomerSupportComponent(null));
    expect(app.headerTitle).toBe('Customer Support');
  });

  it('should navigate back', () => {
    const spy = spyOn(location, 'back');
    app.goBack();
    expect(spy).toHaveBeenCalled();
  });
});
