import { Component, OnInit } from '@angular/core';
import { ProfileService, AuthenticationService } from '@perx/core';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'hkbn-verification-otp',
  templateUrl: './verification-otp.component.html',
  styleUrls: ['./verification-otp.component.scss']
})
export class VerificationOtpComponent implements OnInit {

  private number: string;
  public get numberDisplay(): string {
    return this.number && this.number.substr(0, this.number.length - 3)
      .replace(/\d/g, '*') + this.number.substr(this.number.length - 3);
  }
  constructor(
    private profileService: ProfileService,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.profileService.whoAmI().subscribe((profile) =>
      this.number = profile && profile.phone
    );
  }
  public validate(otp: string): void {
    this.authService.verifyOTP(this.number, otp).pipe(catchError(() => of(null))).subscribe(() => {
      this.router.navigate(['account/phone'], { queryParams: { otp } });
    });
  }
  public resendSms(): void {
    this.authService.requestVerificationToken().pipe(catchError(() => of(null))).subscribe(() => { });
  }
}
