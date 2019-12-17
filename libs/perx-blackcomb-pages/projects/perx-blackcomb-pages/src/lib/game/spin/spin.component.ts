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
      standardProperties = {id: i, backgroundColor: configObject.colorCtrls[i]};
      if (configObject.rewardSlots.includes(i)) {
        islices = [...islices, {...standardProperties, backgroundImage: configObject.rewardIcon}];
        continue;
      }
      islices = [...islices, {...standardProperties}];
    }
    return islices;
  }
}

@Pipe({
  name: 'slotPipe',
  pure: true // wont retrigger unless inputs change so getter wont keep calling
})
export class ConfigToMappedSlotPipe implements PipeTransform {
  public transform(config: ISpin, willWin: boolean): number {
    let slotToLandIndex = config
      .rewardSlots[Math.floor(Math.random() * config.rewardSlots.length)]; // which index of reward Positions
    if (willWin) {
      // console.log(slotToLandIndex, 'slot to land index');
      // console.log('actual slot', config.rewardSlots[slotToLandIndex]);
      return config.rewardSlots[slotToLandIndex]; // get a random number out of the reward slots
    }
    // return first index not inside of the array of winning indexes
    // using color ctrls as proxy to each index position
    // problem: what if all of the slots contains reward? -> should we enforce must have one non-reward slot?
    // issue is that audience sees a rewardIcon expects a reward but preplay shows no rewards to be redeemed,
    //     console.log(config.rewardSlots, 'reward slots'); // double confirm the one returned below is not inside
    slotToLandIndex = +Object.keys(config.colorCtrls).filter(key => !config.rewardSlots.includes(+key))[0];
    //     console.log(slotToLandIndex, 'non winning slot chosen');
    return slotToLandIndex;
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
