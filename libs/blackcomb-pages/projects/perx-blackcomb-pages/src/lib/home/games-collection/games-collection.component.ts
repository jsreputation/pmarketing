import { listAnimation } from './games-collection.animation';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService, IConfig, IGame, IOperatingHours, ITheme, ThemesService } from '@perxtech/core';
import { Router } from '@angular/router';

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
  public isCampaignDisabled: boolean[] = [];

  constructor(
    private themesService: ThemesService,
    private configService: ConfigService,
    private router: Router,
  ) {}

  public ngOnInit(): void {
    this.themesService.getThemeSetting().subscribe( (theme: ITheme) => {
      this.buttonStyle['background-color'] = theme.properties['--button_background_color'] ? theme.properties['--button_background_color'] : '';
      this.buttonStyle.color = theme.properties['--button_text_color'] ? theme.properties['--button_text_color'] : '';
    });

    this.configService.readAppConfig().subscribe(
      (config: IConfig<void>) => {
        this.appConfig = config;
      }
    );

    if (this.games$) {
      this.games$.subscribe((games: IGame[]) => {
        for (const game of games) {
          this.isCampaignDisabled[game.id] = ! this.isGameOperating(game);
        }
      });
    }
  }

  public isGameOperating(game: IGame): boolean {
    return game?.isOperating || false;
  }

  public selectGame(game: IGame): void {
    if (!this.isCampaignDisabled[game.id]) {
      this.router.navigate([ `/game/${game.campaignId}` ]);
    }
  }

  public getOperatingHours(operatingHours: IOperatingHours): string {
    // Date obj that we only need the time from

    const openTime: Date = new Date(operatingHours.opensAt);
    const closeTime: Date = new Date(operatingHours.closesAt);

    const daysMapArr = [ false, false, false, false, false, false, false ]; // index 0 is sunday

    for (const dayIndex in operatingHours.days) {
      if (dayIndex) { // guard-for-in
        daysMapArr[operatingHours.days[dayIndex]] = true;
      }
    }
    const days: string = this.dayArrToIntuitiveStringDayRange(daysMapArr);
    const hours: string =
      `${openTime.getHours()}:${openTime.getMinutes()} - ${closeTime.getHours()}:${closeTime.getMinutes()}`;
    return `Campaign available during: ${days}, ${hours}`;
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
