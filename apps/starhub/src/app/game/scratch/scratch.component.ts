import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';

import {
  IGame,
  IScratch,
} from '@perx/core';

@Component({
  selector: 'page-scratch',
  templateUrl: './scratch.component.html',
  styleUrls: ['./scratch.component.scss']
})
export class ScratchComponent implements OnInit {
  @Input() public willWin: boolean = false;
  @Input() public enabled: boolean = false;
  @Input() public game: IGame;

  @Output() public broken: EventEmitter<void> = new EventEmitter();
  @Output() public loaded: EventEmitter<boolean> = new EventEmitter();

  public ngOnInit(): void {
    this.loaded.emit();
  }

  public get config(): IScratch {
    return this.game.config as IScratch;
  }

  public gameCompleted(): void {
    this.broken.emit();
  }
}
