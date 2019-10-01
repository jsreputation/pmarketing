import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from '@cl-core/api-config';

@Injectable({
  providedIn: 'root'
})
export class AudiencesHttpsService {
  constructor(private http: HttpClient) { }

  public getUser(id: string): Observable<any> {
    return this.http.get(`${ApiConfig.getAllUsers}/${id}?include=pools`);
  }

  public getAudiences(params: HttpParams): Observable<any> {
    return this.http.get(ApiConfig.getAudiences, { params });
  }

  public getAudiencesList(params: HttpParams): Observable<any> {
    return this.http.get(ApiConfig.getAudiences, { params });
  }

  // public getVouchers(): Observable<any> {
  //   return this.http.get('assets/mocks/vouchers.json');
  // }

  public getAllUsers(params: HttpParams): Observable<any> {
    return this.http.get(ApiConfig.getAllUsers, { params });
  }

  public createUser(body): Observable<any> {
    return this.http.post(ApiConfig.getAllUsers, { data: body });
  }

  public updateUserPools(body): Observable<any> {
    return this.http.patch(ApiConfig.getAllUsers + '/' + body.id, { data: body });
  }

  public getAssignedVouchers(params: HttpParams): Observable<any> {
    return this.http.get(ApiConfig.vouchersAssignedPath, { params });
  }

  public voucherAssigned(body: any): Observable<any> {
    return this.http.post(ApiConfig.vouchersAssignedPath, { data: body });
  }

  public updateVoucherExpiry(body: any): Observable<any> {
    return this.http.patch(ApiConfig.vouchersAssignedPath + '/' + body.id, { data: body });
  }
}
