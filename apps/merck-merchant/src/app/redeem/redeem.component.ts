import { Component, OnInit } from '@angular/core';
import { IPayload } from '../order/order.component';
import { Router } from '@angular/router';
import { RewardsService, IGift } from '../services/rewards.service';
import { NotificationService } from '@perx/core';
// import { VouchersService } from '@perx/core/dist/perx-core';

@Component({
  selector: 'app-redeem',
  templateUrl: './redeem.component.html',
  styleUrls: ['./redeem.component.scss']
})
export class RedeemComponent implements OnInit {
  public payload: IPayload;
  public gift: IGift;
  public didProceed: boolean = false;

  constructor(
    private router: Router,
    private rewardsService: RewardsService,
    private notificationService: NotificationService,
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
    this.rewardsService.getReward().subscribe(res => this.gift = res);
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

}
