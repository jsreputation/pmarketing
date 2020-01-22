import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IWLimitAttributes, IJsonApiListPayload, IJsonApiItemPayload, IJsonApiPatchItem, IJsonApiPostItem } from '@perx/whistler';
import { ApiConfigServices } from '../configs/api-config';

@Injectable()
export class LimitsHttpsService {
  constructor(private http: HttpClient,
              private apiConfig: ApiConfigServices) { }

  public getLimits(params: HttpParams, eType: string):
    Observable<IJsonApiListPayload<IWLimitAttributes>> {

    return this.http.get<IJsonApiListPayload<IWLimitAttributes>>(`${this.apiConfig.baseAPIPath}/${eType}/limits`, { params });
  }

  public updateLimit(
    id: string,
    data: IJsonApiPatchItem<IWLimitAttributes>,
    eType: string
  ): Observable<IJsonApiItemPayload<IWLimitAttributes>> {

    const url = `${this.apiConfig.baseAPIPath}/${eType}/limits/${id}`;
    return this.http.patch<IJsonApiItemPayload<IWLimitAttributes>>(url, data);
  }

  public createLimit(
    data: IJsonApiPostItem<IWLimitAttributes>,
    eType: string
  ): Observable<IJsonApiItemPayload<IWLimitAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWLimitAttributes>>(
      `${this.apiConfig.baseAPIPath}/${eType}/limits`,
      data
    );
  }

  public deleteLimit( limitId: number | string, eType: string): Observable<void> {
    return this.http.delete<void>(`${this.apiConfig.baseAPIPath}/${eType}/limits/${limitId}`);
  }
}
