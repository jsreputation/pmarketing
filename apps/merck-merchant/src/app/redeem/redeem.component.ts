import {Component, OnInit} from '@angular/core';
import {IPayload} from '../order/order.component';
import {Router} from '@angular/router';
import {
  NotificationService,
  RewardsService,
  IReward,
  IMerchantAdminService, Voucher
} from '@perx/core';
import {flatMap} from 'rxjs/operators';
import {HttpResponseBase} from '@angular/common/http';

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

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private rewardsService: RewardsService,
    private merchantService: IMerchantAdminService
  ) {
  }

  public ngOnInit(): void {
    const scannedQrCode = history.state.data;
    if (scannedQrCode) {
      try {
        const parsedQrCode = JSON.parse(scannedQrCode);
        this.payload = parsedQrCode;
        this.rewardsService.getReward(parsedQrCode.rewardId).subscribe((res: IReward) => this.reward = res);
      } catch (error) {
        this.notificationService.addSnack('Invalid Merck QR Code');
      }
    }
  }

  public onClose(): void {
    this.router.navigate(['/home']);
  }

  public onProceed(): void {
    this.didProceed = true;
    this.merchantService.issueVoucher(this.payload.rewardId)
      .pipe(
        // flatMap((voucher: Voucher) => this.rewardsService.getRewardPricesOptions(voucher.rewardId)),
        flatMap((res: Voucher) => this.merchantService.redeemVoucher(res.id))
      )
      .subscribe(
        () => this.notificationService.addSnack('Transaction completed'),
        (err: IHttpResponseBase) => this.notificationService.addSnack(err.error.message)
      );
  }

  public getPrice(): number {
    return this.reward.rewardPrice[0].points;
  }
}
