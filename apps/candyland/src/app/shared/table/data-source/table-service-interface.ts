import { Observable } from 'rxjs';

export interface ITableService {
  getTableData(params: HttpParamsOptions): Observable<ITableData<any>>;
}
