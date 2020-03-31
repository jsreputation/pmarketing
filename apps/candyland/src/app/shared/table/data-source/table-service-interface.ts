import { Observable } from 'rxjs';
import { HttpParamsOptions } from '@cl-core/models/params-map';
import { ITableData } from '@cl-core/models/data-list.interface';

export interface ITableService<T = any> {
  getTableData(params: HttpParamsOptions): Observable<ITableData<T>>;
}
