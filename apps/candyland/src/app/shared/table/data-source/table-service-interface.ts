import { Observable } from 'rxjs';

export interface ITableService<T = any> {
  getTableData(params: HttpParamsOptions): Observable<ITableData<T>>;
}
