export interface  IOptionsModel {
  name: string;
  selected?: boolean;
  type:string;
  cardType?:string;
  children?: IOptionsModel[];
}

export interface IFilterModel {
  categories: IOptionsModel[];
  tags: IOptionsModel[];
  cardType: IOptionsModel[];
  locations: IOptionsModel[];
}
