import { Component, OnInit } from '@angular/core';
import { ProfileService, AuthenticationService, IChangePasswordData, IChangePhoneData } from '@perx/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { flatMap } from 'rxjs/operators';
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
    return this.number && this.number.substr(0, this.number.length - 4)
      .replace(/\d/g, '*') + this.number.substr(this.number.length - 4);
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
    this.getInitData();
    this.profileService.whoAmI().subscribe((profile) =>
      this.type !== 'phone' ? this.number = profile && profile.phone : ''
    );
  }
  public update(otp: string): void {
    this
      .switchMethod({ ... this.reqestData, ... { otp } })
      .subscribe((msg) => {
        this.notificationService.addSnack(msg);
        this.router.navigate(['account']);
      }, () => console.error('type is required'));
  }
  private getInitData(): void {
    this.route.params.pipe(flatMap((param) => {
      this.type = param.id;
      if (this.type === 'password') {
        return this.dataTransferService.updateData$;
      }
      return this.route.queryParams;
    })).subscribe((updateData) => {
      if (this.type === 'phone') {
        this.number = updateData.phone;
      }
      this.reqestData = updateData;
    });
  }
  private switchMethod(data: IChangePasswordData | IChangePhoneData): Observable<string> {
    switch (this.type) {
      case 'password':
        return this.authService.changePassword(data as IChangePasswordData)
          .pipe(flatMap(() => this.translate.get('PASSWORD_SUCCESS_UPDATE')));
      case 'phone':
        return this.authService.changePhone(data as IChangePhoneData).pipe(flatMap(() => this.translate.get('MOBILE_SUCCESS_UPDATE')));
    }
  }
  public resendSms(): void {
    this.authService.requestVerificationToken(this.number)
      .pipe(
        flatMap(() => this.translate.get('CHECK_SMS')))
      .subscribe((msg) => this.notificationService.addSnack(msg));
  }
}
