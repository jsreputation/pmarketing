import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OutcomesHttpsService {
  constructor(private http: HttpClient) {
  }

  public getOutcomes(params: HttpParams): Observable<IResponseApi<IOutcomeApi[]>> {
    return this.http.get<IResponseApi<IOutcomeApi[]>>(ApiConfig.outcomesPath, { params });
  }
}
