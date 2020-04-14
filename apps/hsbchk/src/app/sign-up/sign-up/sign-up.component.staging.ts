import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AuthenticationService,
  ConfigService,
  GeneralStaticDataService,
  ICountryCode,
  NotificationService,
  ThemesService
} from '@perxtech/core';
import { Observable } from 'rxjs';
import { ISignUpComponent } from './i-sign-up.component';
import {MatDialog} from '@angular/material';

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
    private generalStaticDataService: GeneralStaticDataService,
    private configService: ConfigService,
    protected dialog: MatDialog
  ) {
    super(fb, router, themesService, authService, notificationService, dialog);
    this.getAppToken();
  }

  public ngOnInit(): void {
    this.countriesList$ = this.generalStaticDataService.getCountriesList([
      'Hong Kong',
      'Singapore'
    ]);
    this.configService.readAppConfig<void>().subscribe((conf) => {
      this.countryCodePrefix = conf.countryCodePrefix;
      this.initForm();
      this.fetchTheme();
    });
  }

  protected get mobileNumber(): string {
    return `${this.countryCode}${this.signupForm.value.mobileNo}`;
  }
}
