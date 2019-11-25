import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfig } from '@cl-core/api-config';
import { IWLoyaltyAttributes, IWBasicTierAttributes, IWCustomTierAttributes } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class LoyaltyHttpService {

  constructor(private http: HttpClient) {
  }

  public getLoyalty(id: string, params: HttpParams): Observable<IJsonApiPayload<IWLoyaltyAttributes>> {
    return this.http.get<IJsonApiPayload<any>>(`${ApiConfig.loyaltyPath}/${id}`, {params});
  }

  public getLoyalties(params: HttpParams): Observable<IJsonApiListPayload<IWLoyaltyAttributes>> {
    return this.http.get<IJsonApiListPayload<IWLoyaltyAttributes>>(ApiConfig.loyaltyPath, {params});
  }

  public createLoyalty(data: IJsonApiPayload<IWLoyaltyAttributes>): Observable<IJsonApiPayload<IWLoyaltyAttributes>> {
    return this.http.post<IJsonApiPayload<IWLoyaltyAttributes>>(ApiConfig.loyaltyPath + '/', data);
  }

  public updateLoyalty(id: string, data: IJsonApiPayload<IWLoyaltyAttributes>): Observable<IJsonApiPayload<IWLoyaltyAttributes>> {
    return this.http.patch<IJsonApiPayload<IWLoyaltyAttributes>>(ApiConfig.loyaltyPath + '/' + id, data);
  }

  public deleteLoyalty(id: string): Observable<IJsonApiPayload<IWLoyaltyAttributes>> {
    return this.http.delete<IJsonApiPayload<IWLoyaltyAttributes>>(ApiConfig.loyaltyPath + '/' + id);
  }

  public createBasicTier(data: IJsonApiPayload<IWBasicTierAttributes>): Observable<IJsonApiPayload<IWBasicTierAttributes>> {
    return this.http.post<IJsonApiPayload<IWBasicTierAttributes>>(ApiConfig.loyaltyBasicTierPath, data);
  }

  public updateBasicTier(id: string, data: IJsonApiPayload<IWBasicTierAttributes>): Observable<IJsonApiPayload<IWBasicTierAttributes>> {
    return this.http.patch<IJsonApiPayload<IWBasicTierAttributes>>(ApiConfig.loyaltyBasicTierPath + '/' + id, data);
  }

  public deleteBasicTier(id: string): Observable<IJsonApiPayload<IWBasicTierAttributes>> {
    return this.http.delete<IJsonApiPayload<any>>(ApiConfig.loyaltyBasicTierPath + '/' + id);
  }

  public getCustomTier(id: string, params: HttpParams): Observable<IJsonApiPayload<IWCustomTierAttributes>> {
    return this.http.get<IJsonApiPayload<IWCustomTierAttributes>>(`${ApiConfig.getLoyaltyCustomTierPath}/${id}`, {params});
  }

  public getCustomTiers(params: HttpParams): Observable<IJsonApiListPayload<IWCustomTierAttributes>> {
    return this.http.get<IJsonApiListPayload<IWCustomTierAttributes>>(ApiConfig.getLoyaltyCustomTierPath, {params});
  }

  public createCustomTier(data: IJsonApiPayload<IWCustomTierAttributes>): Observable<IJsonApiPayload<IWCustomTierAttributes>> {
    return this.http.post<IJsonApiPayload<IWCustomTierAttributes>>(ApiConfig.getLoyaltyCustomTierPath, data);
  }

  public updateCustomTier(id: string, data: IJsonApiPayload<IWCustomTierAttributes>):
    Observable<IJsonApiPayload<IWCustomTierAttributes>> {
    return this.http.patch<IJsonApiPayload<IWCustomTierAttributes>>(ApiConfig.getLoyaltyCustomTierPath + '/' + id, data);
  }

  public deleteCustomTier(id: string): Observable<IJsonApiPayload<IWCustomTierAttributes>> {
    return this.http.delete<IJsonApiPayload<IWCustomTierAttributes>>(ApiConfig.getLoyaltyCustomTierPath + '/' + id);
  }
}
