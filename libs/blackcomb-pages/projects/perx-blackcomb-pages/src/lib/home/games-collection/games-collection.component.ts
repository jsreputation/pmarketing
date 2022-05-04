import { listAnimation } from './games-collection.animation';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ConfigService,
  IConfig,
  IFlags,
  IGame,
  IOperatingHours,
  ITheme,
  SettingsService,
  ThemesService
} from '@perxtech/core';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'perx-blackcomb-games-collection',
  templateUrl: './games-collection.component.html',
  styleUrls: ['./games-collection.component.scss'],
  animations: [listAnimation]
})
export class GamesCollectionComponent implements OnInit {
  @Input('games')
  public games$: Observable<IGame[]>;
  public defaultNbGames: number = 2;
  public showAllGames: boolean = false;
  public buttonStyle: { [key: string]: string } = {};
  public appConfig: IConfig<void>;
  public showOperatingHours: boolean = false;
  public showGameTries: boolean = false;

  constructor(
    private themesService: ThemesService,
    private configService: ConfigService,
    private settingsService: SettingsService
  ) {}

  public ngOnInit(): void {
    this.themesService.getThemeSetting().subscribe( (theme: ITheme) => {
      this.buttonStyle['background-color'] = theme.properties['--button_background_color'] ? theme.properties['--button_background_color'] : '';
      this.buttonStyle.color = theme.properties['--button_text_color'] ? theme.properties['--button_text_color'] : '';
    });

    this.configService.readAppConfig().pipe(
      tap((config: IConfig<void>) => {
        this.appConfig = config;
      }),
      switchMap(() => this.settingsService.getRemoteFlagsSettings())
    ).subscribe((flags: IFlags) => {
      this.showOperatingHours = flags.showHappyHourOperatingHours ? flags.showHappyHourOperatingHours : false;
      this.showGameTries = flags.showGameTriesOnCampaignCard ? flags.showGameTriesOnCampaignCard : false;
    });
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
    return `Campaign available during: ${days}, ${hours} ${operatingHours.formattedOffset}`;
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
