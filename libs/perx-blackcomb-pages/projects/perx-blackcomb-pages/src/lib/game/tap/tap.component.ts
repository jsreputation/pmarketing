import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {
  IGame,
  IPinata
} from '@perx/core';

@Component({
  selector: 'perx-blackcomb-pages-tap',
  templateUrl: './tap.component.html',
  styleUrls: ['./tap.component.scss']
})
export class TapComponent {
  @Output() public broken: EventEmitter<void> = new EventEmitter();
  public get config(): IPinata {
    return this.game.config as IPinata;
  }
  @Input() public game: IGame;
  public isEnabled: boolean = false;
  public gameCompleted(): void {
    this.broken.emit();
  }
}
