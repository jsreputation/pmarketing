import { ICommonGameForm } from '../common-game-form.interface';
import { IGraphic } from '@cl-core/models/graphic.interface';

export interface IShakeTreeForm extends ICommonGameForm {
  background: IGraphic | string;
  giftBox: IGraphic | string;
  treeType: IGraphic | string;
  gameGift: number;
}
