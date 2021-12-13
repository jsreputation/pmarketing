import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { ThemesService, ITheme, IMerchantAdminService, NotificationService, IProfile } from '@perxtech/core';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.scss']
})
export class UserSignupComponent implements OnInit {

  public userSignUpForm: FormGroup;
  public theme: ITheme;
  public userCreationTxt: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private merchantAdminService: IMerchantAdminService,
    private themesService: ThemesService,
    private location: Location,
    private notificationService: NotificationService,
    private translateService: TranslateService
  ) { }

  public get mobileNumber(): AbstractControl | null {
    return this.userSignUpForm.get('mobileNumber');
  }

  public get countryCode(): AbstractControl | null {
    return this.userSignUpForm.get('countryCode');
  }

  public ngOnInit(): void {
    this.initForm();
    this.translateService.get('USER_SIGN_UP_PAGE.USER_CREATION_COMPLETED')
      .subscribe((userCreationTxt: string) => {
        this.userCreationTxt = userCreationTxt;
      });
  }

  private initForm(): void {
    this.userSignUpForm = this.fb.group({
      mobileNumber: ['', [ Validators.required, Validators.pattern('^[0-9]*$')]],
      countryCode: ['852', Validators.required]
    });

    this.themesService.getThemeSetting().subscribe((theme) => {
      this.theme = theme;
    });
  }

  public onSubmit(): void {
    const mobileNumber = this.userSignUpForm.value.mobileNumber.toString();
    const countryCode = this.userSignUpForm.value.countryCode as string;
    const codeAndMobile = countryCode + mobileNumber;
    const cleanedMobileNo = codeAndMobile.replace(/[^0-9]/g, ''); // remove non numeric and special characters
    this.merchantAdminService.signUpNewUser(cleanedMobileNo).subscribe((profile: IProfile) => {
      const data = JSON.stringify({
        verifiedUser: profile
      });
      const navigationExtras: NavigationExtras = {
            state: {
              data
            }
          };
      this.notificationService.addSnack(this.userCreationTxt);
      this.router.navigate(['/order'], navigationExtras);
    }, err => {
      this.notificationService.addSnack(err?.error?.message);
    });
  }

  public onLeftActionClick(): void {
    this.location.back();
  }

}
