import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { ErrorMessageService, IMerchantAdminService, IReward, NotificationService,  RewardsService} from '@perxtech/core';
import { HttpResponseBase } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

interface IHttpResponseBase extends HttpResponseBase {
  error: {
    code: number;
    message: string;
  };
}

interface IPayload {
  name: string;
  id: number;
  rewardId?: number;
  identifier?: string;
  voucherId?: number;
}

@Component({
  selector: 'perx-bcm-pages-redeem',
  templateUrl: './redeem.component.html',
  styleUrls: ['./redeem.component.scss']
})
export class RedeemComponent implements OnInit {
  public payload: IPayload;
  public didProceed: boolean = false;
  public reward: IReward;
  private transactionCompleteTxt: string;

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private rewardsService: RewardsService,
    private merchantService: IMerchantAdminService,
    private translateService: TranslateService,
    private errorMessageService: ErrorMessageService
  ) {
  }

  public ngOnInit(): void {
    const scannedQrCode = history.state.data;
    if (scannedQrCode) {
      try {
        const parsedQrCode = JSON.parse(scannedQrCode);
        this.payload = parsedQrCode;
        this.rewardsService.getReward(parsedQrCode.rewardId, parsedQrCode.identifier).subscribe((res: IReward) => this.reward = res);
      } catch (error) {
        this.notificationService.addSnack('Invalid QR Code');
      }
    }

    // init translations
    this.translateService.get('POPUP_CONTENT.TRANSACTION_COMPLETED')
      .subscribe((translationComplete: string) => {
        this.transactionCompleteTxt = translationComplete;
      });
  }

  public onClose(): void {
    this.router.navigate(['/home']);
  }

  public onProceed(): void {
    this.didProceed = true;
    if (!this.payload.voucherId) {
      throw new Error('voucher id is required');
    }
    this.merchantService.redeemVoucher(this.payload.voucherId)
      .subscribe(
        () => this.notificationService.addSnack(this.transactionCompleteTxt),
        (err: IHttpResponseBase) =>
          this.errorMessageService.getErrorMessageByErrorCode(err.error.code, err.error.message)
            .subscribe(
              (errMessage: string) => {
                this.notificationService.addSnack(errMessage);
              })
      );
  }

}
