export interface ItemModel {
  key: string;
  name: string;
  imageLink?: string;
  imageLinkSelected?: string;
  selected?: boolean;
  children?: ItemModel[],
  url?: string;
}




