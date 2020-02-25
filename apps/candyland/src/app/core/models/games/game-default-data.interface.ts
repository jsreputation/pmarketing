import { IGraphic } from '../graphic.interface';
import { IGameGifts } from '../engagement/game-gifts.interface';

export interface IGameDefaultData {
  background: IGraphic[];
  cardBackground?: IGraphic[];
  gameNumberGift?: IGameGifts[];
  gamesTree?: IGraphic[];
  giftBox?: IGraphic[];
  pinata?: IGraphic[];
  preScratchImage?: IGraphic[];
  postScratchSuccessImage?: IGraphic[];
  postScratchFailImage?: IGraphic[];
  snakeType?: IGraphic[];
  targetIcon?: IGraphic[];
  gameArea?: IGraphic[];
  targetRequired?: IGameGifts[];
}
