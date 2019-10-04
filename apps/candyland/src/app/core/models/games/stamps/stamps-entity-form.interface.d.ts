declare interface IStampsEntityForm extends ICommonGameForm {
  stampsNumber: number;
  stampsSlotNumber: number[];
  preStamp: IGraphic | string;
  rewardPreStamps: IGraphic | string;
  postStamps: IGraphic | string;
  rewardPostStamps: IGraphic | string;
  cardBackground: IGraphic | string;
  background: IGraphic | string;
}
