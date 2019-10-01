import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from '@cl-core/api-config';
import { IJsonApiListPayload, IJsonApiItem, IJSonApiPatchData, IJsonApiPostData } from './jsonapi.payload';
import { IAssignedAttributes, IAssignRequestAttributes } from '@perx/whistler';

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

  public getAllUsers(params: HttpParams): Observable<any> {
    return this.http.get(ApiConfig.getAllUsers, { params });
  }

  public createUser(body: any): Observable<any> {
    return this.http.post(ApiConfig.getAllUsers, { data: body });
  }

  public updateUserPools(body: any): Observable<any> {
    return this.http.patch(`${ApiConfig.getAllUsers}/${body.id}`, { data: body });
  }

  public getAssignedVouchers(params: HttpParams): Observable<IJsonApiListPayload<IAssignedAttributes>> {
    return this.http.get<IJsonApiListPayload<IAssignedAttributes>>(ApiConfig.vouchersAssignedPath, { params });
  }

  public voucherAssigned(body: IJsonApiPostData<IAssignRequestAttributes>): Observable<IJsonApiListPayload<IAssignedAttributes>> {
    return this.http.post<IJsonApiListPayload<IAssignedAttributes>>(ApiConfig.vouchersAssignedPath, { data: body });
  }

  public updateVoucherExpiry(body: IJSonApiPatchData<IAssignedAttributes>): Observable<IJsonApiItem<IAssignedAttributes>> {
    return this.http.patch<IJsonApiItem<IAssignedAttributes>>(`${ApiConfig.vouchersAssignedPath}/${body.id}`, { data: body });
  }
}
