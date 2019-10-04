import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IGame } from '../../../game/game.model';

@Component({
  selector: 'perx-core-shake',
  templateUrl: './shake.component.html',
  styleUrls: ['./shake.component.scss']
})
export class ShakeComponent  {
  @Input() public game: IGame;
  @Output() public broken: EventEmitter<void> = new EventEmitter();
  public isEnabled: boolean = false;
  public gameCompleted(): void {
    this.broken.emit();
  }
}
