import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
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
  ErrorMessageService,
  GeneralStaticDataService,
  IConfig,
  ICountryCode,
  IProfile,
  ISignUpData,
  ITheme,
  NotificationService,
  ThemesService
} from '@perxtech/core';
import {
  map,
  switchMap,
  takeUntil
} from 'rxjs/operators';
import {
  Observable,
  Subject
} from 'rxjs';
import { Moment } from 'moment';

@Component({
  selector: 'app-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {

  public signupForm: FormGroup;
  public errorMessage: string | null;
  public appAccessTokenFetched: boolean = false;
  public theme: Observable<ITheme>;
  public countriesList$: Observable<ICountryCode[]>;
  private destroy$: Subject<void> = new Subject();
  public maxDobDate: Date = new Date(); // today
  public appConfig: IConfig<void>;
  public loadingSubmit: boolean;
  public confirmPasswordHide: boolean = true;
  public passwordHide: boolean = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private configService: ConfigService,
    private notificationService: NotificationService,
    private errorMessageService: ErrorMessageService,
    public generalStaticDataService: GeneralStaticDataService,
    private themesService: ThemesService,
  ) {}

  public ngOnInit(): void {
    this.configService.readAppConfig().subscribe(
      (config: IConfig<void>) => {
        this.appConfig = config;
      }
    );
    this.theme = this.themesService.getThemeSetting();
    this.countriesList$ = this.route.data.pipe(
      map((dataObj) => dataObj.countryList),
      switchMap((countriesList) => this.generalStaticDataService.getCountriesList(countriesList)),
      takeUntil(this.destroy$)
    );

    this.initForm();
    this.getAppToken();
  }

  private getAppToken(): void {
    const token = this.authService.getAppAccessToken();
    if (token) {
      this.appAccessTokenFetched = true;
    } else {
      this.authService.getAppToken().subscribe(() => {
        this.appAccessTokenFetched = true;
      }, (err) => {
        console.error(`Error${err}`);
      });
    }
  }

  private initForm(): void {
    this.signupForm = this.fb.group({
      // firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      countryCode: ['', Validators.required],
      // mobile number
      mobileNo: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      engineNumber: ['', Validators.required],
    }, {validator: this.matchingPasswords('password', 'confirmPassword')});
  }

  public matchingPasswords(passwordKey: string, passwordConfirmationKey: string): (group: FormGroup) => void {
    return (group: FormGroup) => {
      const password = group.controls[passwordKey];
      const passwordConfirmation = group.controls[passwordConfirmationKey];
      if (password.value !== passwordConfirmation.value) {
        return passwordConfirmation.setErrors({mismatchedPasswords: true});
      }
      passwordConfirmation.setErrors(null);
    };
  }

  public onSubmit(): void {
    this.loadingSubmit = true;

    if (!this.appAccessTokenFetched) {
      this.errorMessage = 'Unknown error occurred.';
      return;
    }

    const passwordString = this.signupForm.get('password').value;
    const confirmPassword = this.signupForm.get('confirmPassword').value;
    const lastName = this.signupForm.value.lastName;
    const dob = this.signupForm.value.dob as Moment;
    // converting to Number will strip leading 0s
    const mobileNumber: number = Number(this.signupForm.value.mobileNo);
    const countryCode = this.signupForm.value.countryCode;
    const primaryIdentifier = countryCode + mobileNumber; // identifier for transcycle is also phone

    const engineNumber = this.signupForm.value.engineNumber;

    const signUpData: ISignUpData = {
      lastName,
      birthDay: dob.format(), // convert moment to ISO
      identifier: primaryIdentifier, // identifier for transcycle is also phone
      phone: primaryIdentifier,
      password: passwordString,
      passwordConfirmation: confirmPassword,
      customProperties : {
        engine_number: engineNumber
      }
    };


    this.authService.signup(signUpData)
      .subscribe(
        (data: IProfile | null) => {
          if (!data) {
            return;
          }

          this.router.navigateByUrl('otp/register', { state: { mobileNo: primaryIdentifier }, skipLocationChange: true});
        },
        err => {
          this.errorMessageService.getErrorMessageByErrorCode(err.error.code, err.error.message).subscribe(
            (errMessage: string) => {
              this.notificationService.addSnack(errMessage);
              this.loadingSubmit = false;
            }
          );
        });
  }

  public goToLogin(): void {
    this.router.navigateByUrl('/signin');
  }
}
