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
} from '@perxtech/core';

@Component({
  selector: 'perx-blackcomb-pages-scratch',
  templateUrl: './scratch.component.html',
  styleUrls: ['./scratch.component.scss']
})
export class ScratchComponent implements OnInit {
  @Input() public willWin: boolean = false;

  @Input() public game: IGame;

  @Output() public broken: EventEmitter<void> = new EventEmitter();
  @Output() public loaded: EventEmitter<boolean> = new EventEmitter();

  public headerStyle: { [key: string]: string } = {};
  public subheaderStyle: { [key: string]: string } = {};

  public ngOnInit(): void {
    this.loaded.emit();
    if (this.game.texts.headerColour) {
      this.headerStyle.color = this.game.texts.headerColour;
    }
    if (this.game.texts.subheaderColour) {
      this.subheaderStyle.color = this.game.texts.subheaderColour;
    }
  }

  public isEnabled: boolean = false;

  public get config(): IScratch {
    return this.game.config as IScratch;
  }

  public gameCompleted(): void {
    this.broken.emit();
  }

}
