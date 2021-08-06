import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IPrice, IReward } from '../models/reward.model';
import { map } from 'rxjs/operators';
import { IMacaron } from '../../macaron/models/macaron.model';
import { IOperatingHours } from '../../campaign/models/campaign.model';
import { SettingsService } from '../../settings/settings.service';
import { IFlags } from '../../settings/models/settings.model';

@Component({
  selector: 'perx-core-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss']
})
export class RewardComponent implements OnInit, OnChanges {
  @Input('reward')
  public rewardInitial$: Observable<IReward>;

  public reward$: Observable<IReward>;

  @Input()
  public displayPriceFn: (rewardPrice: IPrice) => Observable<string>;

  @Input()
  public showRewardIdentifier: boolean = false;

  @Input()
  public showExpiry: boolean = true;

  @Input()
  public descriptionLabel: Observable<string> = of('Description');

  @Input()
  public tncLabel: Observable<string> = of('Terms and Conditions');

  @Input()
  public codeLabel: Observable<string> = of('Code');

  @Input()
  public expiryLabel: Observable<string> = of('Expiry');

  @Input()
  public showRewardFavButton?: boolean;

  @Input()
  public macaron?: IMacaron;

  @Input()
  public showMacaron: boolean = true;

  @Output()
  public favoriteRewardEvent: EventEmitter<IReward> = new EventEmitter<IReward>();

  public showOperatingHours: boolean = false;

  constructor(private settingsService: SettingsService) {}

  public ngOnInit(): void {
    this.reward$ = this.rewardInitial$.pipe(
      map(reward => {
        const tncWithOlPadding = reward.termsAndConditions.replace(/(ol>)/, 'ol style="padding-inline-start: 1em;">');
        return {...reward, termsAndConditions: tncWithOlPadding};
      })
    );

    if (!this.displayPriceFn) {
      this.displayPriceFn = (rewardPrice: IPrice) => {
        if (rewardPrice.price && parseFloat(rewardPrice.price) > 0) {
          if (rewardPrice.points && rewardPrice.points > 0) {
            return of(`${rewardPrice.currencyCode} ${rewardPrice.price} and ${rewardPrice.points} points`);
          }
          return of(`${rewardPrice.currencyCode} ${rewardPrice.price}`);
        }

        if (rewardPrice.points && rewardPrice.points > 0) {
          return of(`${rewardPrice.points} points`);
        }
        return of(''); // is actually 0 or invalid value default
      };
    }

    this.settingsService.getRemoteFlagsSettings().subscribe(
      (flags: IFlags) => {
        this.showOperatingHours = flags.showHappyHourOperatingHours ? flags.showHappyHourOperatingHours : false;
      }
    );
  }

  public ngOnChanges(): void {
    this.reward$ = this.rewardInitial$.pipe(
      map(reward => {
        const tncWithOlPadding = reward.termsAndConditions.replace(/(ol>)/, 'ol style="padding-inline-start: 1em;">');
        return {...reward, termsAndConditions: tncWithOlPadding};
      })
    );
  }

  public rewardFavoriteHandler(rewardToggled: IReward): void {
    this.favoriteRewardEvent.emit(rewardToggled);
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
