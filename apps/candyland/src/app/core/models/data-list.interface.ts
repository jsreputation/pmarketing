import { IMeta } from '@perx/whistler';

export interface ITableData<T> {
  data: T[];
  meta: IMeta;
}
