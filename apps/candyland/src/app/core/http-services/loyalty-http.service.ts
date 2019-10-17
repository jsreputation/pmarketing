import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfig } from '@cl-core/api-config';

@Injectable({
  providedIn: 'root'
})
export class LoyaltyHttpService {

  constructor(private http: HttpClient) {
  }

  public getLoyalty(id: string, params: HttpParams): Observable<IJsonApiPayload<any>> {
    return this.http.get<IJsonApiPayload<any>>(`${ApiConfig.loyaltyPath}/${id}`, {params});
  }

  public getLoyalties(params: HttpParams): Observable<IJsonApiPayload<any>> {
    return this.http.get<IJsonApiPayload<any>>(ApiConfig.loyaltyPath, {params});
  }

  public createLoyalty(data: IJsonApiPayload<any>): Observable<any> {
    return this.http.post<IResponseApi<any>>(ApiConfig.loyaltyPath + '/', data);
  }

  public updateLoyalty(id: string, data: IJsonApiPayload<any>): Observable<any> {
    return this.http.patch<IResponseApi<any>>(ApiConfig.loyaltyPath + '/' + id, data);
  }

  public deleteLoyalty(id: string): Observable<IResponseApi<any>> {
    return this.http.delete<IResponseApi<any>>(ApiConfig.loyaltyPath + '/' + id);
  }

  public createLoyaltyBasicTier(data: IJsonApiPayload<any>): Observable<IResponseApi<any>> {
    return this.http.post<IResponseApi<any>>(ApiConfig.loyaltyBasicTierPath, data);
  }

  public updateLoyaltyBasicTier(id: string, data: IJsonApiPayload<any>): Observable<IResponseApi<any>> {
    return this.http.patch<IResponseApi<any>>(ApiConfig.loyaltyBasicTierPath + '/' + id, data);
  }

  public deleteLoyaltyBasicTier(id: string): Observable<IResponseApi<any>> {
    return this.http.delete<IResponseApi<any>>(ApiConfig.loyaltyBasicTierPath + '/' + id);
  }

  public getLoyaltyCustomTier(id: string, params: HttpParams): Observable<IJsonApiPayload<any>> {
    return this.http.get<IJsonApiPayload<any>>(`${ApiConfig.getLoyaltyCustomTierPath}/${id}`, {params});
  }

  public getLoyaltyCustomTiers(params: HttpParams): Observable<IJsonApiPayload<any>> {
    return this.http.get<IJsonApiPayload<any>>(ApiConfig.getLoyaltyCustomTierPath, {params});
  }

  public createLoyaltyCustomTier(data: IJsonApiPayload<any>): Observable<IResponseApi<any>> {
    return this.http.post<IResponseApi<any>>(ApiConfig.getLoyaltyCustomTierPath, data);
  }

  public updateLoyaltyCustomTier(id: string, data: IJsonApiPayload<any>): Observable<IResponseApi<any>> {
    return this.http.patch<IResponseApi<any>>(ApiConfig.getLoyaltyCustomTierPath + '/' + id, data);
  }

  public deleteLoyaltyCustomTier(id: string): Observable<IResponseApi<any>> {
    return this.http.delete<IResponseApi<any>>(ApiConfig.getLoyaltyCustomTierPath + '/' + id);
  }
}
