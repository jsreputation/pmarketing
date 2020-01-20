import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { Observable } from 'rxjs';
import { IWLimitAttributes, IJsonApiListPayload, IJsonApiItemPayload, IJsonApiPatchItem, IJsonApiPostItem } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class LimitsHttpsService {
  constructor(private http: HttpClient) { }

  public getLimits(params: HttpParams, eType: string):
    Observable<IJsonApiListPayload<IWLimitAttributes>> {

    return this.http.get<IJsonApiListPayload<IWLimitAttributes>>(`${ApiConfig.basePath}/${eType}/limits`, { params });
  }

  public updateLimit(
    id: string,
    data: IJsonApiPatchItem<IWLimitAttributes>,
    eType: string
  ): Observable<IJsonApiItemPayload<IWLimitAttributes>> {

    const url = `${ApiConfig.basePath}/${eType}/limits/${id}`;
    return this.http.patch<IJsonApiItemPayload<IWLimitAttributes>>(url, data);
  }

  public createLimit(
    data: IJsonApiPostItem<IWLimitAttributes>,
    eType: string
  ): Observable<IJsonApiItemPayload<IWLimitAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWLimitAttributes>>(
      `${ApiConfig.basePath}/${eType}/limits`,
      data
    );
  }

  public deleteLimit( limitId: number | string, eType: string): Observable<void> {
    return this.http.delete<void>(`${ApiConfig.basePath}/${eType}/limits/${limitId}`);
  }
}
