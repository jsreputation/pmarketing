import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AccountSummaryComponent } from './account-summary.component';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSlideToggleModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TextMaskModule } from 'angular2-text-mask';
import { TranslateModule } from '@ngx-translate/core';
import { IProfile, AuthenticationService } from '@perx/core';
import { RouterTestingModule } from '@angular/router/testing';
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

describe('AccountSummaryComponent', () => {
  let component: AccountSummaryComponent;
  let fixture: ComponentFixture<AccountSummaryComponent>;
  let authService: AuthenticationService;
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
        { provide: AuthenticationService, useValue: authenticationServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSummaryComponent);
    authService = TestBed.get<AuthenticationService>(AuthenticationService as Type<AuthenticationService>);
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
});
