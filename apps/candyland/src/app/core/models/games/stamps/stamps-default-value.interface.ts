import { IGraphic } from '@cl-core/models/graphic.interface';
import { CommonSelect } from '@cl-core/models/common-select.interface';

export interface IStampsDefaultValue {
  number: CommonSelect[];
  slotNumber: CommonSelect[];
  cardBackground: IGraphic[];
  rewardPost: IGraphic[];
  stampsPost: IGraphic[];
  rewardPreStamp: IGraphic[];
  preStamp: IGraphic[];
  backgroundStamp: IGraphic[];
}
