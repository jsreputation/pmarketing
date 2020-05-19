import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {
  IGame,
  ITree
} from '@perxtech/core';

@Component({
  selector: 'perx-blackcomb-pages-shake',
  templateUrl: './shake.component.html',
  styleUrls: ['./shake.component.scss']
})
export class ShakeComponent {
  @Input() public game: IGame;
  public get config(): ITree {
    return this.game.config as ITree;
  }
  @Output() public broken: EventEmitter<void> = new EventEmitter();
  public isEnabled: boolean = false;
  public gameCompleted(): void {
    this.broken.emit();
  }
}
