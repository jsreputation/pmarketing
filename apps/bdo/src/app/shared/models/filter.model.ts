export interface  IOptionsModel {
  name: string;
  value: boolean;
  children?: IOptionsModel[];
}

export interface IFilterModel {
  searchValue:string;
  accountTypes: IOptionsModel[];
  categories: IOptionsModel[];
  tags: IOptionsModel[];
  locations: IOptionsModel[];
}