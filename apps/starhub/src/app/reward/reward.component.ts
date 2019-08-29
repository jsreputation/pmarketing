import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RewardsService } from '@perx/core';
import { IVoucher } from '@perx/core/dist/perx-core/lib/vouchers/models/voucher.model';

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss']
})
export class RewardComponent implements OnInit {
  public rewardId: number;
  public isButtonDisabled: boolean = false;

  constructor(
    private location: Location,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private rewardsService: RewardsService
  ) {}

  public ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(
      ((params: Params) => {
      if (params.id) {
        this.rewardId = params.id;
      }
    }));
  }

  public back(): void {
    this.location.back();
  }

  public save(): void {
    this.rewardsService.reserveReward(this.rewardId)
      .subscribe(
        (voucher: IVoucher) => {
          console.log(voucher);
          this.router.navigate(['/home/vouchers']);
        }
    );
  }

  public setToExpired(isExpired: boolean): void {
    this.isButtonDisabled = isExpired;
  }
}
