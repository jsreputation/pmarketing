import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { of, Observable } from 'rxjs';
import {
  switchMap,
  tap,
} from 'rxjs/operators';
import { AuthenticationService, NotificationService, IChangePasswordData, ProfileService, IChangePhoneData } from '@perxtech/core';

@Component({
  selector: 'app-verification-otp',
  templateUrl: './verification-otp.component.html',
  styleUrls: ['./verification-otp.component.scss']
})
export class VerificationOtpComponent implements OnInit {
  public type: string;
  public data: IChangePhoneData | IChangePasswordData;
  public userPhone?: string;
  constructor(
    private route: ActivatedRoute,
    private auth: AuthenticationService,
    private ntfcService: NotificationService,
    private router: Router,
    private profileService: ProfileService,
  ) {
    this.route.params.pipe(switchMap((params) => this.switchType(params.type)))
      .subscribe((data: IChangePhoneData | IChangePasswordData) => this.data = { ...data, otp: '' });
  }

  public ngOnInit(): void {
  }
  public get phoneDisplay(): string | undefined {
    return this.userPhone && '*'.repeat(this.userPhone.length - 4) + this.userPhone.substr(this.userPhone.length - 4);
  }
  public switchType(type: string): Observable<any> {
    this.type = type;
    switch (this.type) {
      case 'phone':
        return this.route.queryParams.pipe(tap((param) => this.userPhone = param.phone));
      case 'password':
        const currentNavigation = this.router.getCurrentNavigation();
        let changePasswordData;
        if (currentNavigation && currentNavigation.extras.state) {
          changePasswordData = currentNavigation.extras.state as IChangePasswordData;
        }
        this.profileService.whoAmI().subscribe(
          (profile) => this.userPhone = profile.phone,
        );

        return of(changePasswordData);
      default:
        return of(null);
    }
  }

  public update(otp: string): void {
    this.data.otp = otp;
  }

  public onSubmit(): void {
    switch (this.type) {
      case 'phone':
        this.auth.changePhone(this.data as IChangePhoneData).subscribe(() => {
          this.ntfcService.addPopup({ title: 'Success', text: 'Your phone was updated' });
          this.router.navigate(['account']);
        },
        (err) => {
          this.ntfcService.addSnack(err.error.message);
        });
        break;
      case 'password':
        this.auth.changePassword(this.data as IChangePasswordData).subscribe(() => {
          this.ntfcService.addPopup({ title: 'Success', text: 'Your password was updated' });
          this.router.navigate(['account']);
        },
        (err) => {
          this.ntfcService.addSnack(err.error.message);
        });
        break;
    }
  }

  public resendOtp(): void {
    switch (this.type) {
      case 'phone':
        this.auth.requestVerificationToken(this.userPhone).toPromise();
        break;
      case 'password':
        if (this.userPhone) {
          this.auth.resendOTP(this.userPhone).toPromise();
        }
        break;
    }
  }
}
