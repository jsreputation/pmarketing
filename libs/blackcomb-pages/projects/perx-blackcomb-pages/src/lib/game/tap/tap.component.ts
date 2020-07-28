import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';
import {
  IGame,
  IPinata
} from '@perxtech/core';

@Component({
  selector: 'perx-blackcomb-pages-tap',
  templateUrl: './tap.component.html',
  styleUrls: ['./tap.component.scss']
})
export class TapComponent implements OnInit {
  @Output() public broken: EventEmitter<void> = new EventEmitter();
  public get config(): IPinata {
    return this.game.config as IPinata;
  }
  @Input() public game: IGame;
  public isEnabled: boolean = false;
  public gameCompleted(): void {
    this.broken.emit();
  }

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
}
