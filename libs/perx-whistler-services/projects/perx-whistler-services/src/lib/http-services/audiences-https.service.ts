import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  IWAssignedAttributes,
  IWAssignRequestAttributes,
  IWProfileAttributes,
  IWAudiences,
  IJsonApiItemPayload,
  IJsonApiListPayload,
  IJsonApiItem,
  IJsonApiPatchData,
  IJsonApiPostData,
} from '@perx/whistler';
import { ApiConfigServices } from '../configs/api-config';

@Injectable()
export class AudiencesHttpsService {
  constructor(private http: HttpClient,
              private apiConfig: ApiConfigServices) {
  }

  public getUser(id: string, params: HttpParams): Observable<IJsonApiItemPayload<IWProfileAttributes>> {
    return this.http.get<IJsonApiItemPayload<IWProfileAttributes>>(`${this.apiConfig.getAllUsers}/${id}`, { params });
  }

  public getAudiences(params: HttpParams): Observable<IJsonApiListPayload<IWAudiences>> {
    return this.http.get<IJsonApiListPayload<IWAudiences>>(this.apiConfig.getAudiences, { params });
  }

  public getAudience(id: string, params: HttpParams): Observable<IJsonApiItemPayload<IWAudiences>> {
    return this.http.get<IJsonApiItemPayload<IWAudiences>>(`${this.apiConfig.getAudiences}/${id}`, { params });
  }

  public getAllUsers(params: HttpParams): Observable<IJsonApiListPayload<any>> {
    return this.http.get<IJsonApiListPayload<any>>(this.apiConfig.getAllUsers, { params });
  }

  public createUser(data: IJsonApiPostData<IWProfileAttributes>): Observable<IJsonApiItemPayload<IWProfileAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWProfileAttributes>>(this.apiConfig.getAllUsers, { data });
  }

  public updateUser(id: string, data: IJsonApiPatchData<IWProfileAttributes>): Observable<IJsonApiItemPayload<IWProfileAttributes>> {
    return this.http.patch<IJsonApiItemPayload<IWProfileAttributes>>(this.apiConfig.getAllUsers + '/' + id, { data });
  }

  public updateUserPools(data: IJsonApiPatchData<IWProfileAttributes>): Observable<IJsonApiListPayload<IWProfileAttributes, IWAudiences>> {
    return this.http.patch<IJsonApiListPayload<IWProfileAttributes, IWAudiences>>(`${this.apiConfig.getAllUsers}/${data.id}`, { data });
  }

  public getAssignedVouchers(params: HttpParams): Observable<IJsonApiListPayload<IWAssignedAttributes>> {
    return this.http.get<IJsonApiListPayload<IWAssignedAttributes>>(this.apiConfig.vouchersAssignedPath, { params });
  }

  public voucherAssigned(data: IJsonApiPostData<IWAssignRequestAttributes>): Observable<IJsonApiListPayload<IWAssignedAttributes>> {
    return this.http.post<IJsonApiListPayload<IWAssignedAttributes>>(this.apiConfig.vouchersAssignedPath, { data });
  }

  public updateVoucherExpiry(data: IJsonApiPatchData<IWAssignedAttributes>): Observable<IJsonApiItem<IWAssignedAttributes>> {
    return this.http.patch<IJsonApiItem<IWAssignedAttributes>>(`${this.apiConfig.vouchersAssignedPath}/${data.id}`, { data });
  }
}
