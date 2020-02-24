import { ICommonGameForm } from '../common-game-form.interface';
import { IGraphic } from '@cl-core/models/graphic.interface';

export interface IScratchForm extends ICommonGameForm {
  id?: string;
  type?: string;
  gameType?: string;
  preScratchImage: IGraphic | string;
  postScratchSuccessImage: IGraphic | string;
  postScratchFailImage: IGraphic | string;
  background: IGraphic | string;
}
