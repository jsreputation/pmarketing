import { IGraphic } from '@cl-core/models/graphic.interface';
import { ICommonGameForm } from '../common-game-form.interface';
import { CommonSelect } from '@cl-core/models/common-select.interface';

export interface ISpinDefaultValue extends ICommonGameForm {
  gameType?: string;
  numberOfWedges: CommonSelect[];
  rewardSlots: CommonSelect[];
  colorCtrls: { [index: number]: string };
  rewardIcon: IGraphic | string;
  wheelImg: IGraphic | string;
  wheelPosition: IGraphic | string;
  pointerImg: IGraphic | string;
  background: IGraphic | string;
}
