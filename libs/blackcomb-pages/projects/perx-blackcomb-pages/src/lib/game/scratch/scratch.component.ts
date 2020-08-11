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
  public buttonStyle: { [key: string]: string } = {};

  public ngOnInit(): void {
    this.loaded.emit();
    console.log(this.game);
    this.headerStyle.color = this.game.texts.headerColour ? this.game.texts.headerColour : '';
    this.subheaderStyle.color = this.game.texts.subheaderColour ? this.game.texts.subheaderColour : '';
    this.buttonStyle['background-color'] = this.game.texts.buttonColour ? this.game.texts.buttonColour : '#147dd3';
    this.buttonStyle.color = this.game.texts.buttonTextColour ? this.game.texts.buttonTextColour : '#fff';
  }

  public isEnabled: boolean = false;

  public get config(): IScratch {
    return this.game.config as IScratch;
  }

  public gameCompleted(): void {
    this.broken.emit();
  }

  public onClick(): void {
    this.isEnabled = true;
    this.buttonStyle.visibility = 'hidden';
  }
}
