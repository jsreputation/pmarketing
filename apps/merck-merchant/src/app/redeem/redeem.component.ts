import { Component, OnInit } from '@angular/core';
import { IPayload } from '../order/order.component';
import { Router } from '@angular/router';
import { NotificationService, RewardsService, IReward } from '@perx/core';
// import { VouchersService } from '@perx/core';

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
    // private vouchersService: VouchersService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if ( !navigation.extras.state ) {
      return;
    }
    const state = navigation.extras.state.data;
    this.payload = JSON.parse(state);
  }

  public ngOnInit(): void {
    this.rewardsService.getReward(this.payload.rewardId).subscribe((res: IReward) => this.reward = res);
  }

  public onClose(): void {
    this.router.navigate(['/home']);
  }

  public onProceed(): void {
    this.didProceed = true;
    // TODO: Call api to exchange points to voucher
    // Then
    // this.vouchersService.redeemVoucher(1).subscribe(() => call snackbar);
    this.notificationService.addSnack('Transaction completed');
  }

  public getPrice(): number {
    return parseInt(this.reward.rewardPrice[0].rewardAmount, 10);
  }
}
