import { Component, Output, EventEmitter, Input } from '@angular/core';
import { IGame } from '../../../game/game.model';

@Component({
  selector: 'perx-core-tap',
  templateUrl: './tap.component.html',
  styleUrls: ['./tap.component.scss']
})
export class TapComponent {

  @Output() public broken: EventEmitter<void> = new EventEmitter();
  @Input() public game: IGame;
  public isEnabled: boolean = false;
  public gameCompleted(): void {
    this.broken.emit();
  }

}
