import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PCustomerState, IPCustomers } from '@perxtech/model';
import { HttpClient } from '@angular/common/http';
import { ApiConfigService } from '../configs/api-config';

export interface ICustomersQuery {
  state?: PCustomerState;
  page?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  constructor(private http: HttpClient, private apiConfig: ApiConfigService) { }

  public getCustomers(query: ICustomersQuery): Observable<IPCustomers> {
    const params: { [k: string]: string } = {};
    if (query) {
      Object.entries(query).forEach(([k, value]: [string, string]) => { params[k] = value; });
    }
    return this.http.get<IPCustomers>(`${this.apiConfig.baseApiPath}/v4/dash/customers`, { params });
  }
}
