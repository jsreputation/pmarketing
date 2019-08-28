import { Observable } from 'rxjs';

export interface ITableService {
  getTableData(params: any): Observable<any>;
}
