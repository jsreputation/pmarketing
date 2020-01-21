export interface ISnakeForm extends ICommonGameForm {
  targetRequired: number;
  gameType?: string;
  snakeType: IGraphic | string;
  snakeColor: string;
  background: IGraphic | string;
  targetIcon: IGraphic | string;
  gameArea: IGraphic | string;
}
