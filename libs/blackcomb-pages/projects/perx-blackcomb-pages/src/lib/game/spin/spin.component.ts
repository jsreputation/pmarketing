import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFlags, IGame, IOperatingHours, ISpin, ITheme, SettingsService, ThemesService } from '@perxtech/core';
@Component({
  selector: 'perx-blackcomb-pages-spin',
  templateUrl: './spin.component.html',
  styleUrls: ['./spin.component.scss']
})
export class SpinComponent implements OnInit {
  @Input() public willWin: boolean = false;

  @Input() public game: IGame;
  @Input() public startSpin: boolean;

  @Output() public broken: EventEmitter<void> = new EventEmitter();

  public isEnabled: boolean = false;

  @Output() public loaded: EventEmitter<boolean> = new EventEmitter();

  public headerStyle: { [key: string]: string } = {};
  public subheaderStyle: { [key: string]: string } = {};
  public buttonStyle: { [key: string]: string } = {};
  public showOperatingHours: boolean = false;

  constructor(private themesService: ThemesService,
              private settingsService: SettingsService) {}

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

  public get config(): ISpin {
    return this.game.config as ISpin;
  }

  public get spinPosition(): string {
    return this.config.wheelPosition.includes('bottom') ? 'mobile-preview-v2' : 'mobile-preview-plugin';
  }

  public gameCompleted(): void {
    this.broken.emit();
  }

  public emitLoaded(): void {
    this.loaded.emit();
  }

  public startLoad(): void {
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
