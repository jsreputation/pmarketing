import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from '@es-core/api-config';
import {
  IWAssignedAttributes,
  IWAssignRequestAttributes,
  IWProfileAttributes,
  IWPoolsAttributes,
  IWAudiences,
  IJsonApiItemPayload,
  IJsonApiListPayload,
  IJsonApiItem,
  IJsonApiPatchData,
  IJsonApiPostData,
} from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class AudiencesHttpsService {
  constructor(private http: HttpClient) {
  }

  public getUser(id: string, params: HttpParams): Observable<IJsonApiItemPayload<IWProfileAttributes>> {
    return this.http.get<IJsonApiItemPayload<IWProfileAttributes>>(`${ApiConfig.getAllUsers}/${id}`, { params });
  }

  public getAudiences(params: HttpParams): Observable<IJsonApiListPayload<IWAudiences>> {
    return this.http.get<IJsonApiListPayload<IWAudiences>>(ApiConfig.getAudiences, { params });
  }

  public getAudience(id: string, params: HttpParams): Observable<IJsonApiItemPayload<IWAudiences>> {
    return this.http.get<IJsonApiItemPayload<IWAudiences>>(`${ApiConfig.getAudiences}/${id}`, { params });
  }

  public getAllUsers(params: HttpParams): Observable<IJsonApiListPayload<any>> {
    return this.http.get<IJsonApiListPayload<any>>(ApiConfig.getAllUsers, { params });
  }

  public createUser(data: IJsonApiPostData<IWProfileAttributes>): Observable<IJsonApiItemPayload<IWProfileAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWProfileAttributes>>(ApiConfig.getAllUsers, { data });
  }

  public updateUser(id: string, data: IJsonApiPatchData<IWProfileAttributes>): Observable<IJsonApiItemPayload<IWProfileAttributes>> {
    return this.http.patch<IJsonApiItemPayload<IWProfileAttributes>>(ApiConfig.getAllUsers + '/' + id, { data });
  }

  public updateUserPools(data: IJsonApiPatchData<IWProfileAttributes>): Observable<IJsonApiListPayload<IWPoolsAttributes>> {
    return this.http.patch<IJsonApiListPayload<IWPoolsAttributes>>(`${ApiConfig.getAllUsers}/${data.id}`, { data });
  }

  public getAssignedVouchers(params: HttpParams): Observable<IJsonApiListPayload<IWAssignedAttributes>> {
    return this.http.get<IJsonApiListPayload<IWAssignedAttributes>>(ApiConfig.vouchersAssignedPath, { params });
  }

  public voucherAssigned(data: IJsonApiPostData<IWAssignRequestAttributes>): Observable<IJsonApiListPayload<IWAssignedAttributes>> {
    return this.http.post<IJsonApiListPayload<IWAssignedAttributes>>(ApiConfig.vouchersAssignedPath, { data });
  }

  public updateVoucherExpiry(data: IJsonApiPatchData<IWAssignedAttributes>): Observable<IJsonApiItem<IWAssignedAttributes>> {
    return this.http.patch<IJsonApiItem<IWAssignedAttributes>>(`${ApiConfig.vouchersAssignedPath}/${data.id}`, { data });
  }
}
