import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from '@cl-core/api-config';
import { IWAssignedAttributes, IWAssignRequestAttributes, IWhistlerProfileAttributes, IPoolsAttributes} from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class AudiencesHttpsService {
  constructor(private http: HttpClient) {
  }

  public getUser(id: string, params: HttpParams): Observable<IJsonApiPayload<IWhistlerProfileAttributes>> {
    return this.http.get<IJsonApiPayload<IWhistlerProfileAttributes>>(`${ApiConfig.getAllUsers}/${id}`, { params });
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

  public createUser(data: IJsonApiItem<IWhistlerProfileAttributes>): Observable<IJsonApiPayload<IWhistlerProfileAttributes>> {
    return this.http.post<IJsonApiPayload<IWhistlerProfileAttributes>>(ApiConfig.getAllUsers, { data });
  }

  public updateUser(id: string, data: IJsonApiItem<any>): Observable<IJsonApiPayload<IWhistlerProfileAttributes>> {
    return this.http.post<IJsonApiPayload<IWhistlerProfileAttributes>>(ApiConfig.getAllUsers + '/' + id, { data });
  }

  public updateUserPools(data: IJsonApiItem<any>): Observable<IJsonApiListPayload<IPoolsAttributes>> {
    return this.http.patch<IJsonApiListPayload<IPoolsAttributes>>(`${ApiConfig.getAllUsers}/${data.id}`, { data });
  }

  public getAssignedVouchers(params: HttpParams): Observable<IJsonApiListPayload<IWAssignedAttributes>> {
    return this.http.get<IJsonApiListPayload<IWAssignedAttributes>>(ApiConfig.vouchersAssignedPath, { params });
  }

  public voucherAssigned(data: IJsonApiItem<IWAssignRequestAttributes>): Observable<IJsonApiListPayload<IWAssignedAttributes>> {
    return this.http.post<IJsonApiListPayload<IWAssignedAttributes>>(ApiConfig.vouchersAssignedPath, { data });
  }

  public updateVoucherExpiry(data: IJsonApiItem<Partial<IWAssignedAttributes>>): Observable<IJsonApiItem<IWAssignedAttributes>> {
    return this.http.patch<IJsonApiItem<IWAssignedAttributes>>(`${ApiConfig.vouchersAssignedPath}/${data.id}`, { data });
  }
}
