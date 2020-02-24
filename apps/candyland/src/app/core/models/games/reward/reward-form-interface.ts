import { ICommonGameForm } from "../common-game-form.interface";
import { IGraphic } from "@cl-core/models/graphic.interface";

export interface IRewardForm extends ICommonGameForm {
  banner: string;
  background: IGraphic | string;
  cardBackground: IGraphic | string;
}
