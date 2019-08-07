import { Component, OnInit } from '@angular/core';
import { IPayload } from '../order/order.component';
import { Router } from '@angular/router';
import {
  NotificationService,
  RewardsService,
  IReward,
  LoyaltyService,
  VouchersService
} from '@perx/core';
import { IVoucher } from '@perx/core/dist/perx-core/lib/vouchers/models/voucher.model';
import { map, flatMap } from 'rxjs/operators';
import { HttpResponseBase } from '@angular/common/http';

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
    private loyaltyService: LoyaltyService,
    private vouchersService: VouchersService
  ) {
    if (this.router.getCurrentNavigation() !== null
      && this.router.getCurrentNavigation().extras.hasOwnProperty('state')) {
      this.payload = JSON.parse(this.router.getCurrentNavigation().extras.state.data);
    }
  }

  public ngOnInit(): void {
    if (this.payload) {
      this.rewardsService.getReward(this.payload.rewardId).subscribe((res: IReward) => this.reward = res);
    }
  }

  public onClose(): void {
    this.router.navigate(['/home']);
  }

  public onProceed(): void {
    this.didProceed = true;
    this.loyaltyService.exchangePoints(this.payload.id, this.payload.rewardId)
      .pipe(
        map(res => res[0]),
        flatMap((res: IVoucher) => this.vouchersService.redeemVoucher(res.id))
      )
      .subscribe(
        () => this.notificationService.addSnack('Transaction completed'),
        (err: IHttpResponseBase) => this.notificationService.addSnack(err.error.message)
      );
  }

  public getPrice(): number {
    return parseInt(this.reward.rewardPrice[0].rewardAmount, 10);
  }
}
