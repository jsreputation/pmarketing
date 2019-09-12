import { Component, OnInit } from '@angular/core';
import { ProfileService, AuthenticationService } from '@perx/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { Observable, throwError } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { flatMap, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { NotificationWrapperService } from 'src/app/services/notification-wrapper.service';

@Component({
  selector: 'hkbn-verification-otp',
  templateUrl: './verification-otp.component.html',
  styleUrls: ['./verification-otp.component.scss']
})
export class VerificationOtpComponent implements OnInit {
  public type: string;
  private number: string;
  private reqestData: any;
  public get numberDisplay(): string {
    return this.number && this.number.substr(0, this.number.length - 3)
      .replace(/\d/g, '*') + this.number.substr(this.number.length - 3);
  }
  constructor(
    private profileService: ProfileService,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private dataTransferService: DataTransferService,
    private notificationService: NotificationWrapperService,
    private translate: TranslateService
  ) { }

  public ngOnInit(): void {
    this.dataTransferService.updateData$.subscribe((data) => this.reqestData = data);
    this.route.params.subscribe((param: Params) => this.type = param.id);
    this.profileService.whoAmI().subscribe((profile) =>
      this.number = profile && profile.phone
    );
  }
  public update(otp: string): void {
    this.authService.verifyOTP(this.number, otp)
      .pipe(switchMap(() => this.switchMethod({ ... this.reqestData, ... { otp } })))
      .subscribe((msg) => {
        this.notificationService.addSnack(msg);
        this.router.navigate(['account']);
      }, () => console.error('type is required'));
  }
  private switchMethod(data): Observable<string> {
    switch (this.type) {
      case 'password':
        return this.authService.changePassword(data).pipe(switchMap(() => this.translate.get('PASSWORD_SUCCESS_UPDATE')));
      case 'phone':
        return this.authService.changePhone(data).pipe(switchMap(() => this.translate.get('MOBILE_SUCCESS_UPDATE')));
      default:
        return throwError(null);
    }
  }
  public resendSms(): void {
    this.authService.resendOTP(this.number)
      .pipe(catchError(() => of(null)))
      .pipe(
        flatMap(() => this.translate.get('CHECK_SMS')))
      .subscribe((msg) => this.notificationService.addSnack(msg));
  }
}
