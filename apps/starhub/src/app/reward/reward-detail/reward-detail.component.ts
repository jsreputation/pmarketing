import { Component, Input, EventEmitter, Output, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { ConfigService, IConfig, ILoyaltyTierInfo, IReward } from '@perxtech/core';
import { Location } from '@angular/common';
import { IMacaron } from '../../services/macaron.service';
import { IStarhubConfig } from '../../home/home/home.component';

@Component({
  selector: 'app-reward-detail',
  templateUrl: './reward-detail.component.html',
  styleUrls: ['./reward-detail.component.scss']
})
export class RewardDetailComponent implements OnChanges, OnInit {
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

  public reachedSneakPeakTiers: ILoyaltyTierInfo[] = [];
  public unAttainedTiers: ILoyaltyTierInfo[] = [];
  public showLoyaltyTierInfo: boolean = false;

  constructor(
    private location: Location,
    private configService: ConfigService
  ) { }

  public ngOnInit(): void {
    this.configService.readAppConfig<IStarhubConfig>().subscribe(
      (config: IConfig<IStarhubConfig>) => {
        this.showLoyaltyTierInfo = config.custom ? config.custom.mobileIdCR : false;
      }
    );
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.showLoyaltyTierInfo && changes.reward && changes.reward.currentValue) {
      this.buildTierList();
    }
  }

  private buildTierList(): void {
    for (const tierInfo of this.reward.loyalty) {
      if (tierInfo.sneakPeek || tierInfo.attained) {
        this.reachedSneakPeakTiers.push(tierInfo);
      } else if (!tierInfo.sneakPeek && !tierInfo.attained) {
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
