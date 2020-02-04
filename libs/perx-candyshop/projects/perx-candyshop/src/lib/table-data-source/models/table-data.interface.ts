import { IMeta } from 'projects/perx-candyshop/src/models/meta.interface';

export interface ITableData<T> {
  data: T[];
  meta: IMeta;
}
