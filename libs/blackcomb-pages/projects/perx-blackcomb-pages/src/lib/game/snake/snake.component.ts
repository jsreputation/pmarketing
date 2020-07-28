import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IGame, ISnake } from '@perxtech/core';

@Component({
  selector: 'perx-blackcomb-pages-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.scss']
})
export class SnakeComponent {
  @Input() public game: IGame;

  @Output() public broken: EventEmitter<boolean> = new EventEmitter();

  public isEnabled: boolean = false;
  public headerStyle: { [key: string]: string } = {};
  public subheaderStyle: { [key: string]: string } = {};
  
  public ngOnInit(): void {
    if(this.game.texts.headerColour) this.headerStyle.color = this.game.texts.headerColour;
    if(this.game.texts.subheaderColour) this.subheaderStyle.color = this.game.texts.subheaderColour;
  }

  public get config(): ISnake {
    return this.game.config as ISnake;
  }

  public gameCompleted(evt: boolean): void {
    this.broken.emit(evt);
  }

}
