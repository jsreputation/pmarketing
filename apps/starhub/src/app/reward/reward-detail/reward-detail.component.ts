import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IReward, RewardsService } from '@perx/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-reward-detail',
  templateUrl: './reward-detail.component.html',
  styleUrls: ['./reward-detail.component.scss']
})
export class RewardDetailComponent implements OnInit {
  public showMacaron: boolean = false;
  public isExpired: boolean = false;
  public macaronText: string = '';

  @Output()
  public hasExpired: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input()
  public rewardId: number;

  @Input()
  public showBackButton: boolean = true;

  @Input()
  public showBannerImage: boolean = true;

  public reward: IReward;

 constructor(
    private location: Location,
    private rewardsService: RewardsService
    ) {}

  public ngOnInit(): void {
    if (!this.rewardId) {
      return;
    }

    this.rewardsService.getReward(this.rewardId)
      .subscribe((reward: IReward) => {
        this.reward = reward;
        // TODO: following date is being set for macron testing
        const currentDate = new Date();
        this.reward.validTo = new Date(currentDate.setHours(currentDate.getHours() + 35));
    });
  }

  public setToExpired(): void {
    setTimeout(
      () => {
        this.showMacaron = true;
        this.hasExpired.emit(true);
        this.isExpired = true;
        this.macaronText = 'Expired';
      }
    );
  }

  public onExpiring(): void {
    setTimeout(
      () => {
        this.showMacaron = true;
        this.macaronText = 'Expiring';
      }
    );
  }

  public back(): void {
    this.location.back();
  }
}
