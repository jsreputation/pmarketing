declare interface IGraphic {
  id: number;
  type: string;
  active: boolean;
  img: string;
  title?: string;
  format?: string;
  description?: string;
  fullImg?: string;
  imageParts?: IGraphic;
}
