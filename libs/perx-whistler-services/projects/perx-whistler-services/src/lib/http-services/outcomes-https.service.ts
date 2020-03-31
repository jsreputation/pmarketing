import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IWOutcomeAttributes, IJsonApiListPayload, IJsonApiItemPayload, IJsonApiPostItem, IJsonApiPatchItem } from '@perxtech/whistler';
import { ApiConfigServices } from '../configs/api-config';

@Injectable()
export class OutcomesHttpsService {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigServices
  ) { }

  public getOutcomes(params: HttpParams): Observable<IJsonApiListPayload<IWOutcomeAttributes>> {
    return this.http.get<IJsonApiListPayload<IWOutcomeAttributes>>(this.apiConfig.outcomesPath, { params });
  }

  public updateOutcome(id: string, data: IJsonApiPatchItem<IWOutcomeAttributes>): Observable<IJsonApiItemPayload<IWOutcomeAttributes>> {
    return this.http.patch<IJsonApiItemPayload<IWOutcomeAttributes>>(`${this.apiConfig.outcomesPath}/${id}`, data);
  }

  public createOutcome(data: IJsonApiPostItem<IWOutcomeAttributes>): Observable<IJsonApiItemPayload<IWOutcomeAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWOutcomeAttributes>>(this.apiConfig.outcomesPath, data);
  }

  public deleteOutcome(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiConfig.outcomesPath}/${id}`);
  }
}
