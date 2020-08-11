import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { IGame, ISnake } from '@perxtech/core';

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

  public ngOnInit(): void {
    this.headerStyle.color = this.game.texts.headerColour ? this.game.texts.headerColour : '';
    this.subheaderStyle.color = this.game.texts.subheaderColour ? this.game.texts.subheaderColour : '';
    this.buttonStyle['background-color'] = this.game.texts.buttonColour ? this.game.texts.buttonColour : '#2ccce4';
    this.buttonStyle.color = this.game.texts.buttonTextColour ? this.game.texts.buttonTextColour : '#fff';
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
