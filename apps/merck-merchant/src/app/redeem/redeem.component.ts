import {
  Component,
  OnInit
} from '@angular/core';
import { IPayload } from '../order/order.component';
import { Router } from '@angular/router';
import {
  ErrorMessageService,
  IMerchantAdminService,
  IReward,
  NotificationService,
  RewardsService,
  Voucher
} from '@perxtech/core';
import { flatMap } from 'rxjs/operators';
import { HttpResponseBase } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

interface IHttpResponseBase extends HttpResponseBase {
  error: {
    code: number;
    message: string;
  };
}

@Component({
  selector: 'app-redeem',
  templateUrl: './redeem.component.html',
  styleUrls: ['./redeem.component.scss']
})
export class RedeemComponent implements OnInit {
  public payload: IPayload;
  public didProceed: boolean = false;
  public reward: IReward;
  public language: string;
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
        this.notificationService.addSnack('Invalid Merck QR Code');
      }
    }
    this.language = this.translateService.currentLang || this.translateService.defaultLang;

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
    const userId: string = this.payload.identifier ? this.payload.identifier : '';
    if (!this.payload.rewardId) {
      throw new Error('reward id is required');
    }

    this.merchantService.issueVoucher(this.payload.rewardId, this.payload.identifier)
      .pipe(
        // flatMap((voucher: Voucher) => this.rewardsService.getRewardPricesOptions(voucher.rewardId)),
        flatMap((res: Voucher) => this.merchantService.redeemVoucher(res.id, userId))
      )
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

  public getPrice(): string {
    const points = this.reward.rewardPrice && this.reward.rewardPrice[0].points || 0;
    return this.language === 'zh' ? `將扣除${points}積分` : `${points} points will be deducted`;
  }
}
