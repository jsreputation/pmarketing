import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IGame, IOperatingHours, ISnake, ITheme, ThemesService } from '@perxtech/core';

@Component({
  selector: 'perx-blackcomb-pages-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.scss']
})
export class SnakeComponent implements OnInit {
  @Input() public game: IGame;

  @Output() public broken: EventEmitter<boolean> = new EventEmitter();

  public isEnabled: boolean = false;
  public headerStyle: { [key: string]: string } = {};
  public subheaderStyle: { [key: string]: string } = {};
  public buttonStyle: { [key: string]: string } = {};

  constructor(private themesService: ThemesService) {}

  public ngOnInit(): void {
    this.buttonStyle.visibility = 'hidden';
    this.themesService.getThemeSetting().subscribe( (theme: ITheme) => {
      this.buttonStyle['background-color'] = this.game.texts.buttonColour ? this.game.texts.buttonColour :
        theme.properties['--button_background_color'] ? theme.properties['--button_background_color'] : '';
      this.buttonStyle.color = this.game.texts.buttonTextColour ? this.game.texts.buttonTextColour :
        theme.properties['--button_text_color'] ? theme.properties['--button_text_color'] : '';
      this.buttonStyle.visibility = 'visible';
    });
    this.headerStyle.color = this.game.texts.headerColour ? this.game.texts.headerColour : '';
    this.subheaderStyle.color = this.game.texts.subheaderColour ? this.game.texts.subheaderColour : '';
  }

  public get config(): ISnake {
    return this.game.config as ISnake;
  }

  public gameCompleted(evt: boolean): void {
    this.broken.emit(evt);
  }

  public onClick(): void {
    this.isEnabled = true;
    this.buttonStyle.visibility = 'hidden';
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
    return `Play this game during: ${days}, ${hours}`;
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
