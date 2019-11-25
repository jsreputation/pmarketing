declare interface ISpinForm extends ICommonGameForm {
  id?: string;
  type?: string;
  gameType?: string;
  numberOfWedges: string;
  rewardSlots: string;
  wedgeColorSelections: string[];
  rewardIcon: string;
  wheelImg: string;
  wheelPosition: string;
  pointerImg: string;
  background: IGraphic | string;
}
