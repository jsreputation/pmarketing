declare interface IStampsEntityForm {
  name: string;
  headlineMessage: string;
  subHeadlineMessage: string;
  stampsNumber: string;
  stampsSlotNumber: string[];
  preStamp: IGraphic;
  rewardPreStamps: IGraphic;
  postStamps: IGraphic;
  rewardPostStamps: IGraphic;
  cardBackground: IGraphic;
  background: IGraphic;
}
