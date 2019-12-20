import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { Observable } from 'rxjs';
import { IWOutcomeAttributes, IJsonApiListPayload, IJsonApiItemPayload, IJsonApiPostItem, IJsonApiPatchItem } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class OutcomesHttpsService {
  constructor(private http: HttpClient) {
  }

  public getOutcomes(params: HttpParams): Observable<IJsonApiListPayload<IWOutcomeAttributes>> {
    return this.http.get<IJsonApiListPayload<IWOutcomeAttributes>>(ApiConfig.outcomesPath, { params });
  }

  public updateOutcome(id: string, data: IJsonApiPatchItem<IWOutcomeAttributes>): Observable<IJsonApiItemPayload<IWOutcomeAttributes>> {
    return this.http.patch<IJsonApiItemPayload<IWOutcomeAttributes>>(ApiConfig.outcomesPath + '/' + id, data);
  }

  public createOutcome(data: IJsonApiPostItem<IWOutcomeAttributes>): Observable<IJsonApiItemPayload<IWOutcomeAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWOutcomeAttributes>>(ApiConfig.outcomesPath, data);
  }

  public deleteOutcome(id: string): Observable<IJsonApiItemPayload<IWOutcomeAttributes>> {
    return this.http.delete<IJsonApiItemPayload<IWOutcomeAttributes>>(`${ApiConfig.outcomesPath}/${id}`);
  }
}
