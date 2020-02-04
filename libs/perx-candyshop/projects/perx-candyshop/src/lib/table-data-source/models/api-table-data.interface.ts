import { IMeta } from '../../../models/meta.interface';

export interface IApiTableData<T> {
  data: T[];
  meta: IMeta;
}
