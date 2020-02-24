import { ICommonGameForm } from "../common-game-form.interface";
import { IGraphic } from "@cl-core/models/graphic.interface";

export interface ISpinEntityForm extends ICommonGameForm {
  gameType?: string;
  numberOfWedges: number;
  rewardSlots: number[];
  colorCtrls: { [index: number]: string };
  rewardIcon: IGraphic | string;
  wheelImg: IGraphic | string;
  wheelPosition: IGraphic | string;
  pointerImg: IGraphic | string;
  background: IGraphic | string;
}
