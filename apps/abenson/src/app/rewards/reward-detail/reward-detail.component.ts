import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { RewardsService, IReward, LoyaltyService, ILoyalty, IVoucherService, NotificationService } from '@perx/core';
import { switchMap, mergeMap, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { RewardConfirmComponent } from '../reward-confirm/reward-confirm.component';
import { IVoucher } from '@perx/core/dist/perx-core/lib/vouchers/models/voucher.model';

export interface IRewardConfirmComponentParam {
  title: string;
  requiredPoints: number;
}

@Component({
  selector: 'app-reward-detail',
  templateUrl: './reward-detail.component.html',
  styleUrls: ['./reward-detail.component.scss']
})
export class RewardDetailComponent implements OnInit {
  public reward$: Observable<IReward>;
  public rewardData;
  public loyalty: ILoyalty;
  constructor(
    private route: ActivatedRoute,
    private rewardsService: RewardsService,
    private loyaltyService: LoyaltyService,
    private dialog: MatDialog,
    private voucherService: IVoucherService,
    private ntfcService: NotificationService
  ) { }

  ngOnInit() {
    this.reward$ = this.route.params
      .pipe(mergeMap((param) => this.rewardsService.getReward(parseInt(param.id, 19))),
        tap((reward) => this.rewardData = reward));
    this.loyaltyService.getLoyalty().subscribe((loyalty) => this.loyalty = loyalty);
  }

  public buyReward(): void {
    const data: IRewardConfirmComponentParam = {
      title: this.rewardData ? this.rewardData.name : '',
      requiredPoints: this.rewardData &&
        this.rewardData.rewardPrice &&
        this.rewardData.rewardPrice.length > 0 ? this.rewardData.rewardPrice[0].points : 0
    };
    this.dialog.open(RewardConfirmComponent, { width: '30rem', data }).afterClosed()
      .pipe(switchMap((result) => result ? this.exchangePoints() : of(null)))
      .subscribe(() => {
        this.ntfcService.addPopup({
          title: '[Reward Title]',
          text: `Balance ${29} points`
        })
      });
  }

  private exchangePoints(): Observable<IVoucher> {
    return this.voucherService.issueReward(this.rewardData.id);
  }

}
