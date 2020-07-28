import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { IGame, ISpin } from '@perxtech/core';

@Component({
  selector: 'perx-blackcomb-pages-spin',
  templateUrl: './spin.component.html',
  styleUrls: ['./spin.component.scss']
})
export class SpinComponent implements OnInit {
  @Input() public willWin: boolean = false;

  @Input() public game: IGame;

  @Output() public broken: EventEmitter<void> = new EventEmitter();

  public isEnabled: boolean = false;

  @Output() public loaded: EventEmitter<boolean> = new EventEmitter();

  public headerStyle: { [key: string]: string } = {};
  public subheaderStyle: { [key: string]: string } = {};

  public ngOnInit(): void {
    if (this.game.texts.headerColour) {
      this.headerStyle.color = this.game.texts.headerColour;
    }
    if (this.game.texts.subheaderColour) {
      this.subheaderStyle.color = this.game.texts.subheaderColour;
    }
  }

  public get config(): ISpin {
    return this.game.config as ISpin;
  }

  public get spinPosition(): string {
    return this.config.wheelPosition.includes('bottom') ? 'mobile-preview-v2' : 'mobile-preview-plugin';
  }

  public gameCompleted(): void {
    this.broken.emit();
  }

  public startLoad(): void {
    this.isEnabled = true;
    this.loaded.emit();
  }

}
