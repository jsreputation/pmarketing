import {Component, EventEmitter, Input,  Output} from '@angular/core';
import {IGame, ISnake} from '@perx/core';

@Component({
  selector: 'perx-blackcomb-pages-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.scss']
})
export class SnakeComponent {

  @Input() public game: IGame;

  @Output() public broken: EventEmitter<void> = new EventEmitter();

  public isEnabled: boolean = false;

  public get config(): ISnake {
    return this.game.config as ISnake;
  }

  public gameCompleted(): void {
    this.broken.emit();
  }

}
