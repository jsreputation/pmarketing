import {
  Component,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  ActivatedRoute,
  Router
} from '@angular/router';

import {
  AuthenticationService,
  ConfigService,
  equalityValidator,
  GeneralStaticDataService,
  LoyaltyService,
  NotificationService,
  ThemesService
} from '@perxtech/core';
import { TranslateService } from '@ngx-translate/core';
import { ForgotPasswordComponent as BCForgotPasswordComponent } from '@perxtech/blackcomb-pages';
import { tap } from 'rxjs/operators';
import { RESEND_OTP_COUNTDOWN_SECONDS } from '../app.constants';

@Component({
  selector: 'app-forgot-pin',
  templateUrl: './forgot-pin.component.html',
  styleUrls: ['./forgot-pin.component.scss']
})

export class ForgotPinComponent extends BCForgotPasswordComponent implements OnInit {
  public forgotPinForm: FormGroup;
  public MAX_DIGITS_COUNT: number = 5;
  public resendOTPCountDownSeconds: number;
  public countdownComplete: boolean = false;

  public get mobileNumber(): AbstractControl | null {
    return this.forgotPinForm.get('mobileNumber');
  }

  constructor(
    authenticationService: AuthenticationService,
    router: Router,
    route: ActivatedRoute,
    notificationService: NotificationService,
    generalStaticDataService: GeneralStaticDataService,
    configService: ConfigService,
    translate: TranslateService,
    loyaltyService: LoyaltyService,
    themesService: ThemesService,
    private fb: FormBuilder,
  ) {
    super(authenticationService, router, route, notificationService,
      generalStaticDataService, configService, translate, loyaltyService, themesService);
  }

  public ngOnInit(): void {
    this.initForm();
    this.resendOTPCountDownSeconds = RESEND_OTP_COUNTDOWN_SECONDS;
  }

  private initForm(): void {
    this.forgotPinForm = this.fb.group({
      mobileNumber: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$')
        ]
      ]
    });

    this.newPasswordForm = this.fb.group({
      newPassword: new FormControl(null, [Validators.required, Validators.maxLength(4), Validators.minLength(4)]),
      passwordConfirmation: new FormControl(null, [Validators.required, Validators.maxLength(4), Validators.minLength(4)])
    }, {
      validators: [equalityValidator('newPassword', 'passwordConfirmation')]
    });

  }

  public onSubmit(): void {
    // converting to Number will strip leading 0s
    this.identifier = Number(this.forgotPinForm.value.mobileNumber).toString();
    this.usersPhone = this.identifier.slice(-2);

    this.loading = true;
    this.authenticationService.forgotPassword(this.identifier)
      .pipe(
        tap(() => this.loading = false)
      )
      .subscribe(
        () => this.currentStep = 2,
        (err) => this.handleError(err)
      );
  }

  public done(): void {
    this.countdownComplete = true;
  }

  public resend(): void {
    this.countdownComplete = false;
    super.resend();
  }
}
