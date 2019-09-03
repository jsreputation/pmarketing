import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ITableService {
  getTableData(params: HttpParams): Observable<ITableData<any>>;
}
