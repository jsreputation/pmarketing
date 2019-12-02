declare interface ISpinDefaultValue extends ICommonGameForm {
  gameType?: string;
  numberOfWedges: CommonSelect[];
  rewardSlots: CommonSelect[];
  colorCtrls: {[index: number]: string};
  rewardIcon: IGraphic | string;
  wheelImg: IGraphic | string;
  wheelPosition: IGraphic | string;
  pointerImg: IGraphic | string;
  background: IGraphic | string;
}
