import { ICommonGameForm } from '../common-game-form.interface';
import { IGraphic } from '@cl-core/models/graphic.interface';

export interface ISnakeForm extends ICommonGameForm {
  targetRequired: number;
  gameType?: string;
  snakeType: IGraphic | string;
  background: IGraphic | string;
  targetIcon: IGraphic | string;
  gameArea: IGraphic | string;
}
