import {Component, EventEmitter, Input, Output, Pipe, PipeTransform} from '@angular/core';
import {IGame, ISpin, ISlice} from '@perx/core';

@Pipe({
  name: 'slicesPipe',
  pure: true // wont retrigger unless inputs change so getter wont keep calling
})
export class ConfigToSlicesPipe implements PipeTransform {
  public transform(configObject: ISpin): ISlice[] {
    let islices: ISlice[] = [];
    let standardProperties;
    for (let i = 0; i < configObject.numberOfWedges; i++) {
      standardProperties = {id: i, backgroundColor: configObject.colorCtrls[i], label: i.toString()};
      if (configObject.rewardSlots.includes(i + 1)) {
        islices = [...islices, {...standardProperties, backgroundImage: configObject.rewardIcon}];
        continue;
      }
      islices = [...islices, {...standardProperties}];
    }
    return islices;
  }
}

@Component({
  selector: 'perx-blackcomb-pages-spin',
  templateUrl: './spin.component.html',
  styleUrls: ['./spin.component.scss']
})
export class SpinComponent {
  @Input() public willWin: boolean = false;

  @Input() public game: IGame;

  @Output() public broken: EventEmitter<void> = new EventEmitter();

  public isEnabled: boolean = false;

  public get config(): ISpin {
    return this.game.config as ISpin;
  }

  public get spinPosition(): string {
    return this.config.wheelPosition.includes('down') ? 'mobile-preview-v2' : 'mobile-preview-plugin';
  }

  public gameCompleted(): void {
    this.broken.emit();
  }
}
