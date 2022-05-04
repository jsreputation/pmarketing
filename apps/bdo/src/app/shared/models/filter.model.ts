export interface  IOptionsModel {
  id?: number;
  name: string;
  selected?: boolean;
  type:string;
  cardType?:string;
  rewardType?: string;
  children?: IOptionsModel[];
}

export interface IFilterModel {
  type: string;
  categories: IOptionsModel[];
  tags: IOptionsModel[];
  cardType: IOptionsModel[];
  rewardType: IOptionsModel[];
  locations: IOptionsModel[];
}
