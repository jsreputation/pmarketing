import { Observable } from 'rxjs';
import { IApiTableData } from './api-table-data.interface';
import { IHttpParamsOptions } from '../../../models/http-params-options.interface';

export interface IApiTableService<T = any> {
  getTableData(params: IHttpParamsOptions): Observable<IApiTableData<T>>;
}
