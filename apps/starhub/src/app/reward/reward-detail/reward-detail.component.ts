import { Component, Input, EventEmitter, Output, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { ConfigService, IConfig, ILoyaltyTierInfo, IReward, SettingsService, IFlags, IOperatingHours } from '@perxtech/core';
import { Location } from '@angular/common';
import { IMacaron } from '../../services/macaron.service';
import { IStarhubConfig } from '../../home/home/home.component';
import { oc } from 'ts-optchain';

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
  public uxcr: boolean = false;
  public showOperatingHours: boolean = false;

  constructor(
    private location: Location,
    private configService: ConfigService,
    private settingsService: SettingsService
  ) { }

  public ngOnInit(): void {
    this.configService.readAppConfig<IStarhubConfig>().subscribe(
      (config: IConfig<IStarhubConfig>) => {
        this.showLoyaltyTierInfo = config.custom ? config.custom.mobileIdCR : false;
        this.uxcr = oc(config).custom.UXCR(false);
      }
    );
    this.settingsService.getRemoteFlagsSettings().subscribe(
      (flags: IFlags) => {
        this.showOperatingHours = flags.showHappyHourOperatingHours ? flags.showHappyHourOperatingHours : false;
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

  public getOperatingHours(operatingHours: IOperatingHours): string {

    const daysMapArr = [ false, false, false, false, false, false, false ]; // index 0 is sunday

    for (const dayIndex in operatingHours.days) {
      if (dayIndex) { // guard-for-in
        daysMapArr[operatingHours.days[dayIndex]] = true;
      }
    }
    const days: string = this.dayArrToIntuitiveStringDayRange(daysMapArr);
    const hours: string = `${operatingHours.opensAt?.substr(0, 5)} - ${operatingHours.closesAt?.substr(0, 5)}`;
    return `Collect a voucher during: ${days}, ${hours} ${operatingHours.formattedOffset}`;
  }

  private dayOfWeekAsString(dayIndex: number): string {
    return [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ][dayIndex];
  }

  // works but can't wrap sat and sun
  private dayArrToIntuitiveStringDayRange(daysMapArr: boolean[]): string {
    let dayRange = '', multiDayRange = '';
    let findingRange = false;

    for (let i = 0; i <= daysMapArr.length; i++) {
      if (daysMapArr[i]) {
        if (dayRange.length > 0 && !findingRange) {
          findingRange = true;
        } else if (dayRange.length === 0) { // first item in current range.
          dayRange = `${this.dayOfWeekAsString(i)}`;
        }
      } else if (dayRange.length > 0 && ! daysMapArr[i]) { // first part of range already identified
        if (this.dayOfWeekAsString(i - 1) !== dayRange) {
          dayRange = `${dayRange} - ${this.dayOfWeekAsString(i - 1)}`;
        }
        if (multiDayRange.length === 0) {
          multiDayRange = dayRange;
        } else {
          multiDayRange = `${multiDayRange}, ${dayRange}`;
        }
        dayRange = ''; // reset for more ranges;
        findingRange = false;
      }
    }
    return multiDayRange;
  }
}
