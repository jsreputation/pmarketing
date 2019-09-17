
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from '@cl-core/api-config';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VouchersHttpService {

  constructor(private http: HttpClient) {
  }

  public getVouchers(params: HttpParams): Observable<any> {
    return this.http.get(ApiConfig.vouchersPath + '/', {params});
  }

  public getVoucher(id: string): any {
    return this.http.get<any>(ApiConfig.voucherPath + '/' + id);
  }

  public createVoucher(data: any): Observable<any> {
    return this.http.post<any>(ApiConfig.voucherPath, data);
  }
}
