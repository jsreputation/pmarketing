import { Component, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { ILoyaltyTierInfo, IReward } from '@perxtech/core';
import { Location } from '@angular/common';
import { IMacaron } from '../../services/macaron.service';

@Component({
  selector: 'app-reward-detail',
  templateUrl: './reward-detail.component.html',
  styleUrls: ['./reward-detail.component.scss']
})
export class RewardDetailComponent implements OnChanges {
  public isExpired: boolean = false;
  @Input()
  public macaron?: IMacaron;

  @Output()
  public hasExpired: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input()
  public showBannerImage: boolean = true;

  @Input()
  public className: string = 'reward';

  @Input()
  public showMacaron: boolean = true;

  @Input()
  public showBalance: boolean = false;

  @Input()
  public reward: IReward;

  @Input()
  public voucherId?: number;

  public attainedTiers: ILoyaltyTierInfo[] = [];
  public unAttainedTiers: ILoyaltyTierInfo[] = [];

  constructor(
    private location: Location
  ) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.reward && changes.reward.currentValue) {
      this.buildTierList();
    }
  }

  private buildTierList(): void {
    for (const tierInfo of this.reward.loyalty) {
      if (tierInfo.attained) {
        this.attainedTiers.push(tierInfo);
      } else {
        this.unAttainedTiers.push(tierInfo);
      }
    }
  }

  public setToExpired(): void {
    setTimeout(
      () => {
        this.showMacaron = true;
        this.hasExpired.emit(true);
        this.isExpired = true;
        this.macaron = { label: 'Expired', class: 'expired', isButtonEnabled: false };
      }
    );
  }

  public onExpiring(): void {
    setTimeout(
      () => {
        this.showMacaron = true;
        this.macaron = { label: 'Expiring', class: 'expiring', isButtonEnabled: true };
      }
    );
  }

  public back(): void {
    this.location.back();
  }
}
