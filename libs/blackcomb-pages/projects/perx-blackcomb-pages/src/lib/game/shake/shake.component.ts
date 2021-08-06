import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFlags, IGame, IOperatingHours, ITheme, ITree, SettingsService, ThemesService } from '@perxtech/core';

@Component({
  selector: 'perx-blackcomb-pages-shake',
  templateUrl: './shake.component.html',
  styleUrls: ['./shake.component.scss']
})
export class ShakeComponent implements OnInit {
  @Input() public game: IGame;
  public get config(): ITree {
    return this.game.config as ITree;
  }
  @Output() public broken: EventEmitter<void> = new EventEmitter();
  public isEnabled: boolean = false;
  public gameCompleted(): void {
    this.broken.emit();
  }

  constructor(private themesService: ThemesService,
              private settingsService: SettingsService) {}

  public headerStyle: { [key: string]: string } = {};
  public subheaderStyle: { [key: string]: string } = {};
  public buttonStyle: { [key: string]: string } = {};
  public showOperatingHours: boolean = false;

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

    this.settingsService.getRemoteFlagsSettings().subscribe(
      (flags: IFlags) => {
        this.showOperatingHours = flags.showHappyHourOperatingHours ? flags.showHappyHourOperatingHours : false;
      }
    );
  }

  public onClick(): void {
    this.isEnabled = true;
    this.buttonStyle.visibility = 'hidden';
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
    return `Play this game during: ${days}, ${hours} ${operatingHours.formattedOffset}`;
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
