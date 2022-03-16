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
  styleUrls: ['./sign-up.component.scss']
})
export class SignupComponent implements OnInit {

  public signupForm: FormGroup;
  public errorMessage: string | null;
  public appAccessTokenFetched: boolean = false;
  public theme: Observable<ITheme>;
  public countriesList$: Observable<ICountryCode[]>;
  private destroy$: Subject<void> = new Subject();
  public maxDobDate: Date = new Date(); // today
  public appConfig: IConfig<void>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private configService: ConfigService,
    private notificationService: NotificationService,
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
      name: ['', Validators.required],
      dob: ['', Validators.required],
      // postcode: ['', Validators.required],
      countryCode: ['60', Validators.required],
      mobileNo: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      email: ['', Validators.email],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      referralCode: [''],
      accept_terms: [false, Validators.requiredTrue],
      accept_marketing: [false, Validators.required]
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
    if (!this.appAccessTokenFetched) {
      this.errorMessage = 'Unknown error occurred.';
      return;
    }

    const passwordString = this.signupForm.get('password').value;
    const confirmPassword = this.signupForm.get('confirmPassword').value;
    const name = this.signupForm.value.name;
    const dob = this.signupForm.value.dob as Moment;
    // converting to Number will strip leading 0s
    const mobileNumber: number = Number(this.signupForm.value.mobileNo);
    const countryCode = this.signupForm.value.countryCode;
    const codeAndMobile = countryCode + mobileNumber;

    const emailValue = this.signupForm.value.email;

    // const postcodeString = this.signupForm.value.postcode;
    const referralCode = this.signupForm.value.referralCode;

    const signUpData: ISignUpData = {
      lastName: name,
      birthDay: dob.format(), // convert moment to ISO
      phone: codeAndMobile,
      password: passwordString,
      passwordConfirmation: confirmPassword,
      email: emailValue,
      // postcode: postcodeString
    };

    if (referralCode.length > 0 && this.appConfig.showReferralDetails) {
      signUpData.customProperties = {
        referralCode
      };
    }

    this.authService.signup(signUpData)
      .subscribe(
        (data: IProfile | null) => {
          if (!data) {
            return;
          }

          this.router.navigateByUrl('otp/register', { state: { mobileNo: codeAndMobile }, skipLocationChange: true});
        },
        err => {
          this.notificationService.addSnack(err.error.message);
        });
  }

  public goToLogin(): void {
    this.router.navigateByUrl('/signin');
  }
}
