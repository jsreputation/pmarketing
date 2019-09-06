import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IReward, RewardsService } from '@perx/core';
import { Location } from '@angular/common';
import { MacaronService, IMacaron } from '../../services/macaron.service';

@Component({
  selector: 'app-reward-detail',
  templateUrl: './reward-detail.component.html',
  styleUrls: ['./reward-detail.component.scss']
})
export class RewardDetailComponent implements OnInit {
  public isExpired: boolean = false;
  public macaron: IMacaron;

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

  @Input()
  public showMacaron: boolean = true;

  public reward: IReward;

  constructor(
    private location: Location,
    private rewardsService: RewardsService,
    private macaronService: MacaronService
  ) { }

  public ngOnInit(): void {
    if (!this.rewardId) {
      return;
    }

    this.rewardsService.getReward(this.rewardId)
      .subscribe((reward: IReward) => {
        this.reward = reward;

        this.macaron = this.macaronService.getMacaron(reward);
        if (this.macaron === null) {
          this.isButtonEnabled.emit(true);
          return;
        }

        this.isButtonEnabled.emit(this.macaron.isButtonEnabled);
      });
  }

  public setToExpired(): void {
    setTimeout(
      () => {
        this.showMacaron = true;
        this.hasExpired.emit(true);
        this.isExpired = true;
        if (this.macaron === null) {
          this.macaron = { label: '', class: '', isButtonEnabled: false };
        }
        this.macaron.label = 'Expired';
      }
    );
  }

  public onExpiring(): void {
    setTimeout(
      () => {
        this.showMacaron = true;
        if (this.macaron === null) {
          this.macaron = { label: '', class: '', isButtonEnabled: false };
        }
        this.macaron.label = 'Expiring';
      }
    );
  }

  public back(): void {
    this.location.back();
  }
}
