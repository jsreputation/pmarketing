import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { Observable } from 'rxjs';
import { IOutcomeAttributes } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class OutcomesHttpsService {
  constructor(private http: HttpClient) {
  }

  public getOutcomes(params: HttpParams): Observable<IJsonApiListPayload<IOutcomeAttributes>> {
    return this.http.get<IJsonApiListPayload<IOutcomeAttributes>>(ApiConfig.outcomesPath, { params });
  }
}
