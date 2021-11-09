export interface  IOptionsModel {
  id?: number;
  name: string;
  selected?: boolean;
  type:string;
  cardType?:string;
  children?: IOptionsModel[];
}

export interface IFilterModel {
  type: string;
  categories: IOptionsModel[];
  tags: IOptionsModel[];
  cardType: IOptionsModel[];
  locations: IOptionsModel[];
}
