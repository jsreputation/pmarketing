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

  public createBasicTier(data: IJsonApiPayload<any>): Observable<IResponseApi<any>> {
    return this.http.post<IResponseApi<any>>(ApiConfig.loyaltyBasicTierPath, data);
  }

  public updateBasicTier(id: string, data: IJsonApiPayload<any>): Observable<IResponseApi<any>> {
    return this.http.patch<IResponseApi<any>>(ApiConfig.loyaltyBasicTierPath + '/' + id, data);
  }

  public deleteBasicTier(id: string): Observable<IResponseApi<any>> {
    return this.http.delete<IResponseApi<any>>(ApiConfig.loyaltyBasicTierPath + '/' + id);
  }

  public getCustomTier(id: string, params: HttpParams): Observable<IJsonApiPayload<any>> {
    return this.http.get<IJsonApiPayload<any>>(`${ApiConfig.getLoyaltyCustomTierPath}/${id}`, {params});
  }

  public getCustomTiers(params: HttpParams): Observable<IJsonApiPayload<any>> {
    return this.http.get<IJsonApiPayload<any>>(ApiConfig.getLoyaltyCustomTierPath, {params});
  }

  public createCustomTier(data: IJsonApiPayload<any>): Observable<IResponseApi<any>> {
    return this.http.post<IResponseApi<any>>(ApiConfig.getLoyaltyCustomTierPath, data);
  }

  public updateCustomTier(id: string, data: IJsonApiPayload<any>): Observable<IResponseApi<any>> {
    return this.http.patch<IResponseApi<any>>(ApiConfig.getLoyaltyCustomTierPath + '/' + id, data);
  }

  public deleteCustomTier(id: string): Observable<IResponseApi<any>> {
    return this.http.delete<IResponseApi<any>>(ApiConfig.getLoyaltyCustomTierPath + '/' + id);
  }
}
