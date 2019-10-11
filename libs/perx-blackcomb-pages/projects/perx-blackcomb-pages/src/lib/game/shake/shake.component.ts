import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  IGame, ITree
} from '@perx/core';

@Component({
  selector: 'perx-blackcomb-pages-shake',
  templateUrl: './shake.component.html',
  styleUrls: ['./shake.component.scss']
})
export class ShakeComponent {
  @Input() public game: IGame;
  @Output() public broken: EventEmitter<void> = new EventEmitter();
  public get config(): ITree {
    return this.game && this.game.config ? this.game.config as ITree : null;
  }
  public isEnabled: boolean = false;
  public gameCompleted(): void {
    this.broken.emit();
  }
}
