declare interface IScratchForm extends ICommonGameForm {
  id?: string;
  type?: string;
  gameType?: string;
  preScratchImage: IGraphic | string;
  postScratchSuccessImage: IGraphic | string;
  postScratchFailImage: IGraphic | string;
  background: IGraphic | string;
}
