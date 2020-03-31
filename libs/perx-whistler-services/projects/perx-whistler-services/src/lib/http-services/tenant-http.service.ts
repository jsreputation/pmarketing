import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IJsonApiItemPayload, IJsonApiListPayload, IWTenant } from '@perxtech/whistler';
import { ApiConfigServices } from '../configs/api-config';

@Injectable()
export class TenantHttpService {

  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigServices
  ) { }

  public getTenant(params: HttpParams): Observable<IJsonApiListPayload<IWTenant>> {
    return this.http.get<IJsonApiListPayload<IWTenant>>(this.apiConfig.tenantsPath, { ...params });
  }

  public patchTenant(data: IJsonApiItemPayload<IWTenant>, id: string): Observable<IJsonApiItemPayload<IWTenant>> {
    return this.http.patch<IJsonApiItemPayload<IWTenant>>(`${this.apiConfig.tenantsPath}/${id}`, data);
  }
}
