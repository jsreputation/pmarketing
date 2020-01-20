import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from '@cl-core/api-config';
import { IJsonApiItemPayload, IJsonApiListPayload, IWTenant } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class TenantHttpService {

  constructor(private http: HttpClient) { }

  public getTenant(params: HttpParams): Observable<IJsonApiListPayload<IWTenant>> {
    return this.http.get<IJsonApiListPayload<IWTenant>>(ApiConfig.tenantsPath, {...params} );
  }

  public patchTenant(data: IJsonApiItemPayload<IWTenant>, id: string): Observable<IJsonApiItemPayload<IWTenant>> {
    return this.http.patch<IJsonApiItemPayload<IWTenant>>( `${ApiConfig.tenantsPath}/${id}`, data);
  }
}
