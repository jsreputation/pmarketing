declare interface ISpinDefaultValue extends ICommonGameForm {
  numberOfWedges: CommonSelect[];
  rewardSlots: CommonSelect[];
  wedgeColorSelections: { labelView: string, color: string }[];
  rewardIcon: IGraphic | string;
  wheelImg: IGraphic | string;
  wheelPosition: IGraphic | string;
  pointerImg: IGraphic | string;
  background: IGraphic | string;
}
