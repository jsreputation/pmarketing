import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AccountSummaryComponent } from './account-summary.component';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSlideToggleModule,
  MatSlideToggleChange,
  MatSlideToggle
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TextMaskModule } from 'angular2-text-mask';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { IProfile, AuthenticationService, ProfileService, NotificationService } from '@perx/core';
import { of, throwError } from 'rxjs';
import { Type } from '@angular/core';

const accountDataStub: IProfile = {
  id: 0,
  firstName: 'Temp',
  state: 'issued',
  lastName: 'Temp'
};

const authenticationServiceStub = {
  requestVerificationToken: () => of(null)
};
const notificationServiceStub = {
  addPopup: () => ({}), addSnack: () => { }
};

const profileServiceStub = {
  setCustomProperties: () => of(null)
};

describe('AccountSummaryComponent', () => {
  let component: AccountSummaryComponent;
  let fixture: ComponentFixture<AccountSummaryComponent>;
  let authService: AuthenticationService;
  let profileService: ProfileService;
  let notificationService: NotificationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatCheckboxModule,
        MatInputModule,
        MatIconModule,
        TextMaskModule,
        MatButtonModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatSlideToggleModule,
        TranslateModule.forRoot(),
        RouterTestingModule.withRoutes([{
          path: 'account/verify_token',
          component: AccountSummaryComponent
        }])
      ],
      declarations: [AccountSummaryComponent],
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceStub },
        { provide: ProfileService, useValue: profileServiceStub },
        { provide: NotificationService, useValue: notificationServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSummaryComponent);
    authService = TestBed.get<AuthenticationService>(AuthenticationService as Type<AuthenticationService>);
    profileService = TestBed.get<ProfileService>(ProfileService as Type<ProfileService>);
    notificationService = TestBed.get(NotificationService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should path accountsummary', fakeAsync(() => {
    const spy = spyOn(component.accountSummary, 'patchValue');
    component.accountData = accountDataStub;
    component.ngOnChanges();
    tick();
    expect(spy).toHaveBeenCalledWith(accountDataStub);
  }));

  it('should navigate to account/verify_token', fakeAsync(() => {
    const spy = spyOn(authService, 'requestVerificationToken').and.returnValue(throwError(null));
    component.updateMobileVerification(new Event('click'));
    tick();
    expect(spy).toHaveBeenCalled();
  }));

  it('should handle error', fakeAsync(() => {
    const errorMessage = 'error';
    const spy = spyOn(notificationService, 'addSnack');
    spyOn(profileService, 'setCustomProperties').and.returnValue(throwError(errorMessage));
    component.agreement(new MatSlideToggleChange({} as MatSlideToggle, true));
    tick();
    expect(spy).toHaveBeenCalledWith(errorMessage);
  }));

  it('should handle success', fakeAsync(() => {
    const spy = spyOn(notificationService, 'addSnack');
    spyOn(profileService, 'setCustomProperties').and.returnValue(of(null));
    component.agreement(new MatSlideToggleChange({} as MatSlideToggle, true));
    tick();
    expect(spy).not.toHaveBeenCalled();
  }));
});
