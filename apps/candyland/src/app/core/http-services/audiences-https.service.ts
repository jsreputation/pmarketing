import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from '@cl-core/api-config';
import { IAssignedAttributes, IAssignRequestAttributes, IUser , IPoolsApi } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class AudiencesHttpsService {
  constructor(private http: HttpClient) {
  }

  public getUser(id: string, params: HttpParams): Observable<IJsonApiPayload<Partial<IUser>>> {
    return this.http.get<IJsonApiPayload<Partial<IUser>>>(`${ApiConfig.getAllUsers}/${id}`, { params });
  }

  public getAudiences(params: HttpParams): Observable<IJsonApiPayload<any>> {
    return this.http.get<IJsonApiPayload<any>>(ApiConfig.getAudiences, { params });
  }

  public getAudiencesList(params: HttpParams): Observable<IJsonApiListPayload<any>> {
    return this.http.get<IJsonApiListPayload<any>>(ApiConfig.getAudiences, { params });
  }

  public getAudience(id: string, params: HttpParams): Observable<IJsonApiPayload<any>> {
    return this.http.get<IJsonApiPayload<any>>(`${ApiConfig.getAudiences}/${id}`, { params });
  }

  public getAllUsers(params: HttpParams): Observable<IJsonApiListPayload<any>> {
    return this.http.get<IJsonApiListPayload<any>>(ApiConfig.getAllUsers, { params });
  }

  public createUser(data: IJsonApiItem<Partial<IUser>>): Observable<IJsonApiPayload<Partial<IUser>>> {
    return this.http.post<IJsonApiPayload<Partial<IUser>>>(ApiConfig.getAllUsers, { data });
  }

  public updateUser(id: string, data: IJsonApiItem<any>): Observable<IJsonApiPayload<Partial<IUser>>> {
    return this.http.post<IJsonApiPayload<Partial<IUser>>>(ApiConfig.getAllUsers + '/' + id, { data });
  }

  public updateUserPools(data: IJsonApiItem<any>): Observable<IJsonApiListPayload<IPoolsApi>> {
    return this.http.patch<IJsonApiListPayload<IPoolsApi>>(`${ApiConfig.getAllUsers}/${data.id}`, { data });
  }

  public getAssignedVouchers(params: HttpParams): Observable<IJsonApiListPayload<IAssignedAttributes>> {
    return this.http.get<IJsonApiListPayload<IAssignedAttributes>>(ApiConfig.vouchersAssignedPath, { params });
  }

  public voucherAssigned(data: IJsonApiItem<IAssignRequestAttributes>): Observable<IJsonApiListPayload<IAssignedAttributes>> {
    return this.http.post<IJsonApiListPayload<IAssignedAttributes>>(ApiConfig.vouchersAssignedPath, { data });
  }

  public updateVoucherExpiry(data: IJsonApiItem<Partial<IAssignedAttributes>>): Observable<IJsonApiItem<IAssignedAttributes>> {
    return this.http.patch<IJsonApiItem<IAssignedAttributes>>(`${ApiConfig.vouchersAssignedPath}/${data.id}`, { data });
  }
}
