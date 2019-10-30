import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import {
  IGame,
  IScratch,
} from '@perx/core';

@Component({
  selector: 'perx-blackcomb-pages-scratch',
  templateUrl: './scratch.component.html',
  styleUrls: ['./scratch.component.scss']
})
export class ScratchComponent {
  @Input() public game: IGame;

  @Output() public broken: EventEmitter<void> = new EventEmitter();

  public isEnabled: boolean = false;

  public get config(): IScratch {
    return this.game.config as IScratch;
  }

  public gameCompleted(): void {
    this.broken.emit();
  }
}
