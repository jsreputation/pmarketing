import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {
  RewardsService,
  IReward,
  LoyaltyService,
  ILoyalty,
  IVoucherService,
  NotificationService,
  Voucher
} from '@perxtech/core';
import {
  switchMap,
  mergeMap,
  tap,
  catchError,
} from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { RewardConfirmComponent } from '../reward-confirm/reward-confirm.component';

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
  public rewardData: IReward;
  public loyalty: ILoyalty;
  constructor(
    private route: ActivatedRoute,
    private rewardsService: RewardsService,
    private loyaltyService: LoyaltyService,
    private dialog: MatDialog,
    private voucherService: IVoucherService,
    private ntfcService: NotificationService
  ) { }

  public ngOnInit(): void {
    this.reward$ = this.route.params
      .pipe(mergeMap((param) => this.rewardsService.getReward(parseInt(param.id, 10))),
        tap((reward) => this.rewardData = reward));
    this.loyaltyService.getLoyalty().subscribe((loyalty) => this.loyalty = loyalty);
  }

  public buyReward(): any {
    const data: IRewardConfirmComponentParam = {
      title: this.rewardData ? this.rewardData.name : '',
      requiredPoints: this.rewardData &&
        this.rewardData.rewardPrice &&
        this.rewardData.rewardPrice.length > 0
        && this.rewardData.rewardPrice[0].points ? this.rewardData.rewardPrice[0].points : 0
    };
    return this.dialog.open(RewardConfirmComponent, { width: '30rem', data }).afterClosed()
      .pipe(
        switchMap((result) => result ? this.exchangePoints() : of(null))
      )
      .subscribe(
        () => {
        },
        (err) => {
          // borrow not enough points logic from rewards booking component
          if (err.code === 40) {
            this.ntfcService.addPopup({
              title: 'Sorry',
              text: 'You do not have enough points for this transaction'
            });
          }
        }
      );
  }

  private exchangePoints(): Observable<Voucher> {
    return this.voucherService.issueReward(this.rewardData.id).pipe(
      tap((voucher: Voucher) => {
        // check if there's a valid voucher
        if (voucher && voucher.id > 0) {
          this.ntfcService.addPopup({
            title: `Successfully purchased ${this.rewardData.name}.`,
            buttonTxt: 'Got it'
          });
        }
      }),
      catchError((err) => {
        return of(err);
      })
    );
  }

}
