export interface  IOptionsModel {
  name: string;
  value: boolean;
  children?: IOptionsModel[];
}

export interface IFilterModel {
  [type:string]: IOptionsModel[];
}