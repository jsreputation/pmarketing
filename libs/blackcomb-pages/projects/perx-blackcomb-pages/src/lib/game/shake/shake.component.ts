import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';
import {
  IGame,
  ITree
} from '@perxtech/core';

@Component({
  selector: 'perx-blackcomb-pages-shake',
  templateUrl: './shake.component.html',
  styleUrls: ['./shake.component.scss']
})
export class ShakeComponent implements OnInit {
  @Input() public game: IGame;
  public get config(): ITree {
    return this.game.config as ITree;
  }
  @Output() public broken: EventEmitter<void> = new EventEmitter();
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
