import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { Observable } from 'rxjs';
import { IWOutcomeAttributes } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class OutcomesHttpsService {
  constructor(private http: HttpClient) {
  }

  public getOutcomes(params: HttpParams): Observable<IJsonApiListPayload<IWOutcomeAttributes>> {
    return this.http.get<IJsonApiListPayload<IWOutcomeAttributes>>(ApiConfig.outcomesPath, {params});
  }

  public updateOutcome(id: string, data: IJsonApiPayload<IWOutcomeAttributes>): Observable<IJsonApiPayload<IWOutcomeAttributes>> {
    return this.http.patch<IJsonApiPayload<IWOutcomeAttributes>>(ApiConfig.outcomesPath + '/' + id, data);
  }

  public createOutcome(data: IJsonApiPayload<IWOutcomeAttributes>): Observable<IJsonApiPayload<IWOutcomeAttributes>> {
    return this.http.post<IJsonApiPayload<IWOutcomeAttributes>>(ApiConfig.outcomesPath, data);
  }

  public deleteOutcome(id: string): Observable<IJsonApiPayload<IWOutcomeAttributes>> {
    return this.http.delete<IJsonApiPayload<IWOutcomeAttributes>>(`${ApiConfig.outcomesPath}/${id}`);
  }

}
