import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { IGame, ISpin, ThemesService, ITheme } from '@perxtech/core';

@Component({
  selector: 'perx-blackcomb-pages-spin',
  templateUrl: './spin.component.html',
  styleUrls: ['./spin.component.scss']
})
export class SpinComponent implements OnInit {
  @Input() public willWin: boolean = false;

  @Input() public game: IGame;

  @Output() public broken: EventEmitter<void> = new EventEmitter();

  public isEnabled: boolean = false;

  @Output() public loaded: EventEmitter<boolean> = new EventEmitter();

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

  public get config(): ISpin {
    return this.game.config as ISpin;
  }

  public get spinPosition(): string {
    return this.config.wheelPosition.includes('bottom') ? 'mobile-preview-v2' : 'mobile-preview-plugin';
  }

  public gameCompleted(): void {
    this.broken.emit();
  }

  public startLoad(): void {
    this.isEnabled = true;
    this.buttonStyle.visibility = 'hidden';
    this.loaded.emit();
  }

}
