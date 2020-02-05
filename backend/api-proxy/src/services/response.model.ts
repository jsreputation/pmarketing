import { IEntity } from './entity.model';

export interface IListResponse<T> {
  data: IEntity<T>[];
  links: {
    first: string;
    last: string;
  };
}

export interface ISingleResponse<T> {
  data: IEntity<T>;
}
