import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  IGame,
  IPinata
} from '@perx/core';

@Component({
  selector: 'app-tap',
  templateUrl: './tap.component.html',
  styleUrls: ['./tap.component.scss']
})
export class TapComponent {
  @Output() public broken: EventEmitter<void> = new EventEmitter();
  @Input() public game: IGame;
  public get config(): IPinata {
    return this.game && this.game.config ? this.game.config as IPinata : null;
  }
  public isEnabled: boolean = false;
  public gameCompleted(): void {
    this.broken.emit();
  }
}
