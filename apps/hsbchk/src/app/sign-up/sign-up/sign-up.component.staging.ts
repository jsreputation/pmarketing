import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService, GeneralStaticDataService, ICountryCode, NotificationService, ThemesService } from '@perxtech/core';
import { Observable } from 'rxjs';
import { ISignUpComponent } from './i-sign-up.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent extends ISignUpComponent implements OnInit, OnDestroy {
  public countryCode: string = '';
  public countriesList$: Observable<ICountryCode[]>;

  constructor(
    protected fb: FormBuilder,
    protected router: Router,
    protected themesService: ThemesService,
    protected authService: AuthenticationService,
    protected notificationService: NotificationService,
    private generalStaticDataService: GeneralStaticDataService
  ) {
    super(fb, router, themesService, authService, notificationService);
    this.initForm();
    this.getAppToken();
  }

  public ngOnInit(): void {
    this.countriesList$ = this.generalStaticDataService.getCountriesList([
      'Hong Kong',
      'Singapore'
    ]);
    this.initForm();
    this.fetchTheme();
  }

  protected get mobileNumber(): string {
    return `${this.countryCode}${this.signupForm.value.mobileNo}`;
  }
}
