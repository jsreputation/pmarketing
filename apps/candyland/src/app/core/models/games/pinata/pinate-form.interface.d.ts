export interface IPinataForm extends ICommonGameForm {
  id?: string;
  type?: string;
  gameType?: string;
  background: IGraphic | string;
  pinata: IGraphic | string;
  crackingPinata?: IGraphic | string;
  openedPinata?: IGraphic | string;
}
