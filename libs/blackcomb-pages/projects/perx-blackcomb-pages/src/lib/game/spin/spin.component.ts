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
  public buttonStyle: { [key: string]: string } = {};

  public ngOnInit(): void {
    this.headerStyle.color = this.game.texts.headerColour ? this.game.texts.headerColour : '';
    this.subheaderStyle.color = this.game.texts.subheaderColour ? this.game.texts.subheaderColour : '';
    this.buttonStyle['background-color'] = this.game.texts.buttonColour ? this.game.texts.buttonColour : '#2ccce4';
    this.buttonStyle.color = this.game.texts.buttonTextColour ? this.game.texts.buttonTextColour : '#fff';
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
    this.buttonStyle.visibility = 'hidden';
    this.loaded.emit();
  }

}
