import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { IGame, ISnake, ThemesService, ITheme } from '@perxtech/core';

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
    this.themesService.getThemeSetting().subscribe( (theme: ITheme) => {
      this.buttonStyle['background-color'] = this.game.texts.buttonColour ? this.game.texts.buttonColour :
        theme.properties['--button_background_color'] ? theme.properties['--button_background_color'] : '';
      this.buttonStyle.color = this.game.texts.buttonTextColour ? this.game.texts.buttonTextColour :
        theme.properties['--button_text_color'] ? theme.properties['--button_text_color'] : '';
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

}
