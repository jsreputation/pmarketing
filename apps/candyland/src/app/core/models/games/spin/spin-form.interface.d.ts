declare interface ISpinEntityForm extends ICommonGameForm {
  numberOfWedges: number;
  rewardSlots: number[];
  wedgeColorSelections: { labelView: string, color: string }[];
  rewardIcon: IGraphic | string;
  wheelImg: IGraphic | string;
  wheelPosition: IGraphic | string;
  pointerImg: IGraphic | string;
  background: IGraphic | string;
}
