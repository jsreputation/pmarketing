import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { IGame, IPlinko } from '@perxtech/core';
@Component({
  selector: 'perx-blackcomb-pages-plinko',
  templateUrl: './plinko.component.html',
  styleUrls: ['./plinko.component.scss']
})
export class PlinkoComponent implements OnInit {

  @Input() public willWin: boolean = false;
  @Input() public game: IGame;
  @Input() public startGame: boolean = false;

  @Output() public broken: EventEmitter<void> = new EventEmitter();
  @Output() public loaded: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  public ngOnInit(): void {
    this.loaded.emit();
  }

  public get config(): IPlinko {
    return this.game.config as IPlinko;
  }

  public gameCompleted(): void {
    this.broken.emit();
  }

}
