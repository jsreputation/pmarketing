import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  IGame,
} from '@perx/core';

@Component({
  selector: 'app-tap',
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
