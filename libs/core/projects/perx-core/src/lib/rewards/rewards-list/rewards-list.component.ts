import { Component, EventEmitter, Input, OnInit, Output, } from '@angular/core';

import { Observable, of } from 'rxjs';

import { IPrice, IReward, } from '../models/reward.model';
import { Colors } from '../../perx-core.constants';
import { ITheme } from '../../utils/themes/themes.model';
import { ThemesService } from '../../utils/themes/themes.service';
import { delay } from 'rxjs/operators';
import { IOperatingHours } from '../../campaign/models/campaign.model';
import { SettingsService } from '../../settings/settings.service';
import { IFlags } from '../../settings/models/settings.model';

@Component({
  selector: 'perx-core-rewards-list',
  templateUrl: './rewards-list.component.html',
  styleUrls: ['./rewards-list.component.scss']
})
export class RewardsListComponent implements OnInit {

  public repeatGhostCount: number = 10;
  public theme: ITheme | null = null;
  public colorPrimary: Colors = Colors.Primary;
  public ghostTimeOut: boolean;

  @Input('rewardsList')
  public rewards$: Observable<IReward[]>;

  @Input()
  public defaultImg: string;

  @Input()
  public displayPriceFn: (rewardPrice: IPrice) => Observable<string>;

  @Output()
  public tapped: EventEmitter<IReward> = new EventEmitter<IReward>();

  public showOperatingHours: boolean = false;

  public get themeFontColor(): string | null {
    return this.theme ? this.theme.properties['--font_color'] : null;
  }

  private initTheme(): void {
    this.themesService.getThemeSetting().subscribe(
      theme => this.theme = theme
    );
  }

  constructor(
    private themesService: ThemesService,
    private settingsService: SettingsService
  ) { }

  public ngOnInit(): void {
    this.initTheme();

    this.settingsService.getRemoteFlagsSettings().subscribe(
      (flags: IFlags) => {
        this.showOperatingHours = flags.showHappyHourOperatingHours ? flags.showHappyHourOperatingHours : false;
      }
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

    of(true).pipe(delay(2000)).subscribe(
      () => this.ghostTimeOut = true
    );
  }

  public isRewardQueryComplete(rewards: IReward[] | null): boolean {
    return Array.isArray(rewards) || this.ghostTimeOut;
  }

  public rewardClickedHandler(reward: IReward): void {
    this.tapped.emit(reward);
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
