import { Component, Input, EventEmitter, Output } from '@angular/core';
import { IReward } from '@perxtech/core';
import { Location } from '@angular/common';
import { IMacaron } from '../../services/macaron.service';

@Component({
  selector: 'app-reward-detail',
  templateUrl: './reward-detail.component.html',
  styleUrls: ['./reward-detail.component.scss']
})
export class RewardDetailComponent {
  public isExpired: boolean = false;
  @Input()
  public macaron?: IMacaron;

  @Output()
  public hasExpired: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  public isRewardExpired: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input()
  public showBannerImage: boolean = true;

  @Input()
  public className: string = 'reward';

  @Input()
  public showMacaron: boolean = true;

  @Input()
  public showBalance: boolean = true;

  @Input()
  public reward: IReward;

  @Input()
  public voucherId?: number;

  constructor(
    private location: Location
  ) { }

  public setToExpired(): void {
    this.isRewardExpired.emit(false);
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
