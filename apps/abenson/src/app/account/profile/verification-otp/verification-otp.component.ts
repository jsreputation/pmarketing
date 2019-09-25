import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { IChangePhoneData } from '@perx/core/dist/perx-core/lib/auth/authentication/models/authentication.model';
import { AuthenticationService, NotificationService, IChangePasswordData } from '@perx/core';

@Component({
  selector: 'app-verification-otp',
  templateUrl: './verification-otp.component.html',
  styleUrls: ['./verification-otp.component.scss']
})
export class VerificationOtpComponent implements OnInit {
  public type: string;
  public data: IChangePhoneData | IChangePasswordData;
  public userPhone: string;
  constructor(
    private route: ActivatedRoute,
    private auth: AuthenticationService,
    private ntfcService: NotificationService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.route.params.pipe(switchMap((params) => this.switchType(params.type)))
      .subscribe((data: IChangePhoneData | IChangePasswordData) => this.data = { ...data, otp: null });
  }
  public get phoneDisplay(): string {
    return this.userPhone && '*'.repeat(this.userPhone.length - 4) + this.userPhone.substr(this.userPhone.length - 4);
  }
  public switchType(type: string): Observable<any> {
    this.type = type;
    switch (this.type) {
      case 'phone':
        return this.route.queryParams.pipe(tap((param) => this.userPhone = param.phone));
      case 'password':
        return of(null);
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
          this.ntfcService.addPopup({ title: 'Success', text: 'You phone was update' });
          this.router.navigate(['account']);
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
        this.auth.resendOTP(this.userPhone).toPromise();
        break;
    }
  }
}
