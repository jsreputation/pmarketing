import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfig } from '@cl-core/api-config';
import {
  IWLoyaltyAttributes,
  IWBasicTierAttributes,
  IWCustomTierAttributes,
  IJsonApiItemPayload,
  IJsonApiListPayload,
  IJsonApiPostItem,
  IJsonApiPatchItem
} from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class LoyaltyHttpService {

  constructor(private http: HttpClient) {
  }

  public getLoyalty(id: string, params: HttpParams): Observable<IJsonApiItemPayload<IWLoyaltyAttributes>> {
    return this.http.get<IJsonApiItemPayload<IWLoyaltyAttributes>>(`${ApiConfig.loyaltyPath}/${id}`, { params });
  }

  public getLoyalties(params: HttpParams): Observable<IJsonApiListPayload<IWLoyaltyAttributes>> {
    return this.http.get<IJsonApiListPayload<IWLoyaltyAttributes>>(ApiConfig.loyaltyPath, { params });
  }

  public createLoyalty(data: IJsonApiPostItem<IWLoyaltyAttributes>): Observable<IJsonApiItemPayload<IWLoyaltyAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWLoyaltyAttributes>>(ApiConfig.loyaltyPath + '/', data);
  }

  public updateLoyalty(id: string, data: IJsonApiPatchItem<IWLoyaltyAttributes>): Observable<IJsonApiItemPayload<IWLoyaltyAttributes>> {
    return this.http.patch<IJsonApiItemPayload<IWLoyaltyAttributes>>(ApiConfig.loyaltyPath + '/' + id, data);
  }

  public deleteLoyalty(id: string): Observable<IJsonApiItemPayload<IWLoyaltyAttributes>> {
    return this.http.delete<IJsonApiItemPayload<IWLoyaltyAttributes>>(ApiConfig.loyaltyPath + '/' + id);
  }

  public createBasicTier(data: IJsonApiPostItem<IWBasicTierAttributes>): Observable<IJsonApiItemPayload<IWBasicTierAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWBasicTierAttributes>>(ApiConfig.loyaltyBasicTierPath, data);
  }

  public updateBasicTier(
    id: string,
    data: IJsonApiPatchItem<IWBasicTierAttributes>
  ): Observable<IJsonApiItemPayload<IWBasicTierAttributes>> {
    return this.http.patch<IJsonApiItemPayload<IWBasicTierAttributes>>(ApiConfig.loyaltyBasicTierPath + '/' + id, data);
  }

  public deleteBasicTier(id: string): Observable<IJsonApiItemPayload<IWBasicTierAttributes>> {
    return this.http.delete<IJsonApiItemPayload<any>>(ApiConfig.loyaltyBasicTierPath + '/' + id);
  }

  public getCustomTier(id: string, params: HttpParams): Observable<IJsonApiItemPayload<IWCustomTierAttributes>> {
    return this.http.get<IJsonApiItemPayload<IWCustomTierAttributes>>(`${ApiConfig.getLoyaltyCustomTierPath}/${id}`, { params });
  }

  public getCustomTiers(params: HttpParams): Observable<IJsonApiListPayload<IWCustomTierAttributes>> {
    return this.http.get<IJsonApiListPayload<IWCustomTierAttributes>>(ApiConfig.getLoyaltyCustomTierPath, { params });
  }

  public createCustomTier(data: IJsonApiPostItem<IWCustomTierAttributes>): Observable<IJsonApiItemPayload<IWCustomTierAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWCustomTierAttributes>>(ApiConfig.getLoyaltyCustomTierPath, data);
  }

  public updateCustomTier(id: string, data: IJsonApiPatchItem<IWCustomTierAttributes>):
    Observable<IJsonApiItemPayload<IWCustomTierAttributes>> {
    return this.http.patch<IJsonApiItemPayload<IWCustomTierAttributes>>(ApiConfig.getLoyaltyCustomTierPath + '/' + id, data);
  }

  public deleteCustomTier(id: string): Observable<IJsonApiItemPayload<IWCustomTierAttributes>> {
    return this.http.delete<IJsonApiItemPayload<IWCustomTierAttributes>>(ApiConfig.getLoyaltyCustomTierPath + '/' + id);
  }
}
