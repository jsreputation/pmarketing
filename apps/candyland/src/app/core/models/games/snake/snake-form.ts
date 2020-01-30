export interface ISnakeForm extends ICommonGameForm {
  targetRequired: number;
  gameType?: string;
  snakeType: IGraphic | string;
  background: IGraphic | string;
  targetIcon: IGraphic | string;
  gameArea: IGraphic | string;
}
