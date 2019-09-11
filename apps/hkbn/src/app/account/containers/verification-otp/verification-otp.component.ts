import { Component, OnInit } from '@angular/core';
import { ProfileService, AuthenticationService, NotificationService } from '@perx/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { flatMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'hkbn-verification-otp',
  templateUrl: './verification-otp.component.html',
  styleUrls: ['./verification-otp.component.scss']
})
export class VerificationOtpComponent implements OnInit {
  private type: string;
  private number: string;
  public get numberDisplay(): string {
    return this.number && this.number.substr(0, this.number.length - 3)
      .replace(/\d/g, '*') + this.number.substr(this.number.length - 3);
  }
  constructor(
    private profileService: ProfileService,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private translate: TranslateService
  ) { }

  public ngOnInit(): void {
    this.route.params.subscribe((param: Params) => this.type = param.id);
    this.profileService.whoAmI().subscribe((profile) =>
      this.number = profile && profile.phone
    );
  }
  public validate(otp: string): void {
    this.authService.verifyOTP(this.number, otp).subscribe(() => {
      this.router.navigate(['account', this.type], { queryParams: { otp } });
    });
  }
  public resendSms(): void {
    this.authService.resendOTP(this.number)
      .pipe(catchError(()=>of(null)))
      .pipe(
        flatMap(() => this.translate.get('CHECK_SMS')))
      .subscribe((msg) => this.notificationService.addSnack(msg));
  }
}
