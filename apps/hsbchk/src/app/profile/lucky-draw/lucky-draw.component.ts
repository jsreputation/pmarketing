import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import {
  AuthenticationService,
  ITheme,
  // NotificationService,
  ThemesService
} from '@perxtech/core';
// import {Router} from '@angular/router';

@Component({
  selector: 'app-lucky-draw',
  templateUrl: './lucky-draw.component.html',
  styleUrls: ['./lucky-draw.component.scss']
})
export class LuckyDrawComponent implements OnInit, OnDestroy {
  public luckdrawForm: FormGroup;
  public errorMessage: string | null;
  public appAccessTokenFetched: boolean = false;
  private destroy$: Subject<void> = new Subject();
  public theme: Observable<ITheme>;

  constructor(
    private fb: FormBuilder,
    // private router: Router,
    private themesService: ThemesService,
    private authService: AuthenticationService,
    // private notificationService: NotificationService
  ) {
    this.initForm();
    this.getAppToken();
  }

  public ngOnInit(): void {
    this.initForm();
    const token = this.authService.getAppAccessToken();
    if (token) {
      this.appAccessTokenFetched = true;
      this.theme = this.themesService.getThemeSetting();
    } else {
      this.authService.getAppToken().subscribe(() => {
        this.appAccessTokenFetched = true;
        this.theme = this.themesService.getThemeSetting();
      }, (err) => {
        console.error(`Error${err}`);
      });
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
    this.luckdrawForm = this.fb.group({
      fullName: ['', Validators.required],
      hkid: ['', Validators.required],
      accept_marketing: [false]
    });
  }

  public onSubmit(): void {
    if (!this.appAccessTokenFetched) {
      this.errorMessage = 'Unknown error occured.';
      return;
    }
    const fullName = this.luckdrawForm.value.fullName;
    const hkid = this.luckdrawForm.value.hkid;

    const signUpData: any = {
      fullName,
      hkid
    };

    console.log(signUpData);
    //   // is there a path to patch signup data? if not i have to fetch the data and post again?
    //   this.authService.signup(signUpData).subscribe(
    //     () => {
    //       // navigate back to profile page? most logical
    //       // this.router.navigateByUrl('otp/register', { state: { mobileNo: mobileNumber } });
    //     },
    //     err => {
    //       this.notificationService.addSnack(err.error.message);
    //     });
    // }

  }
}
