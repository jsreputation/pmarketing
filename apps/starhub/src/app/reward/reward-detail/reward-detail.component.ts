import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IReward, RewardsService } from '@perx/core';
import { Location } from '@angular/common';
import { MacaronService } from '../../services/macaron.service';

@Component({
  selector: 'app-reward-detail',
  templateUrl: './reward-detail.component.html',
  styleUrls: ['./reward-detail.component.scss']
})
export class RewardDetailComponent implements OnInit {
  public showMacaron: boolean = false;
  public isExpired: boolean = false;
  public macaronText: string = '';
  public macaronClass: string;
  public rewardBalance: number | null;

  @Output()
  public hasExpired: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  public isButtonEnabled: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input()
  public rewardId: number;

  @Input()
  public showBackButton: boolean = true;

  @Input()
  public showBannerImage: boolean = true;

  @Input()
  public className: string = 'reward';

  public reward: IReward;

 constructor(
    private location: Location,
    private rewardsService: RewardsService,
    private macaronService: MacaronService
    ) {}

  public ngOnInit(): void {
    if (!this.rewardId) {
      return;
    }

    this.rewardsService.getReward(this.rewardId)
      .subscribe((reward: IReward) => {
        this.reward = reward;

        reward.inventory.rewardTotalBalance = 100;
        reward.inventory.rewardTotalLimit = 5000;
        const macaron = this.macaronService.getMacaron(reward);
        if (macaron === null) {
          this.isButtonEnabled.emit(true);
          return;
        }
        this.macaronText = macaron.label;
        this.macaronClass = macaron.class;
        this.rewardBalance = macaron.rewardBalance || null;
        this.showMacaron = true;
        this.isButtonEnabled.emit(macaron.isButtonEnabled);
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
