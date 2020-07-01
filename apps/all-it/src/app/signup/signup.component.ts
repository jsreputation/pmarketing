import {
  Component,
  OnInit
} from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  AuthenticationService,
  NotificationService,
  ISignUpData,
  IProfile,
  ICountryCode,
  GeneralStaticDataService
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
import { DateAdapter } from '@angular/material';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signupForm: FormGroup;
  public errorMessage: string | null;
  public appAccessTokenFetched: boolean = false;

  public countriesList$: Observable<ICountryCode[]>;
  private destroy$: Subject<void> = new Subject();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private notificationService: NotificationService,
    public generalStaticDataService: GeneralStaticDataService,
    private dateAdapter: DateAdapter<Date>
  ) {}

  public ngOnInit(): void {
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
      title: ['', Validators.required],
      name: ['', Validators.required],
      dob: ['', Validators.required],
      postcode: ['', Validators.required],
      countryCode: ['60', Validators.required],
      mobileNo: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      accept_terms: [false, Validators.required],
      accept_marketing: [false, Validators.required]
    });
  }

  public onSubmit(): void {
    if (!this.appAccessTokenFetched) {
      this.errorMessage = 'Unknown error occurerd.';
      return;
    }

    const passwordString = this.signupForm.get('password').value;
    const confirmPassword = this.signupForm.get('confirmPassword').value;
    if (passwordString !== confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    const name = this.signupForm.value.name;
    const dob = this.signupForm.value.dob;

    const mobileNumber = this.signupForm.value.mobileNo;
    const countryCode = this.signupForm.value.countryCode;
    const codeAndMobile = countryCode + mobileNumber;

    const emailValue = this.signupForm.value.email;

    const titleString = this.signupForm.value.title;
    const postcodeString = this.signupForm.value.postcode;

    const signUpData: ISignUpData = {
      lastName: name,
      birthDay: this.dateAdapter.format(dob, 'yyyy-MM-dd')
        .replace(/\//g, '-') ,
      phone: codeAndMobile,
      password: passwordString,
      passwordConfirmation: confirmPassword,
      email: emailValue,
      title: titleString,
      postcode: postcodeString
    };

    this.authService.signup(signUpData)
      .subscribe(
        (data: IProfile | null) => {
          if (!data) {
            return;
          }

          this.router.navigateByUrl('otp/register', { state: { mobileNo: codeAndMobile } });
        },
        err => {
          this.notificationService.addSnack(err.error.message);
        });
  }

  public goToLogin(): void {
    this.router.navigateByUrl('/signin');
  }
}
