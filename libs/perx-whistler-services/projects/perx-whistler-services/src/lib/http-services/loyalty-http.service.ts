import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IWLoyaltyAttributes,
  IWBasicTierAttributes,
  IWCustomTierAttributes,
  IJsonApiItemPayload,
  IJsonApiListPayload,
  IJsonApiPostItem,
  IJsonApiPatchItem
} from '@perx/whistler';
import { ApiConfigServices } from '../configs/api-config';

@Injectable()
export class LoyaltyHttpService {

  constructor(private http: HttpClient,
              private apiConfig: ApiConfigServices) {
  }

  public getLoyalty(id: string, params: HttpParams): Observable<IJsonApiItemPayload<IWLoyaltyAttributes>> {
    return this.http.get<IJsonApiItemPayload<IWLoyaltyAttributes>>(`${this.apiConfig.loyaltyPath}/${id}`, { params });
  }

  public getLoyalties(params: HttpParams): Observable<IJsonApiListPayload<IWLoyaltyAttributes>> {
    return this.http.get<IJsonApiListPayload<IWLoyaltyAttributes>>(this.apiConfig.loyaltyPath, { params });
  }

  public createLoyalty(data: IJsonApiPostItem<IWLoyaltyAttributes>): Observable<IJsonApiItemPayload<IWLoyaltyAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWLoyaltyAttributes>>(this.apiConfig.loyaltyPath + '/', data);
  }

  public updateLoyalty(id: string, data: IJsonApiPatchItem<IWLoyaltyAttributes>): Observable<IJsonApiItemPayload<IWLoyaltyAttributes>> {
    return this.http.patch<IJsonApiItemPayload<IWLoyaltyAttributes>>(this.apiConfig.loyaltyPath + '/' + id, data);
  }

  public deleteLoyalty(id: string): Observable<void> {
    return this.http.delete<void>(this.apiConfig.loyaltyPath + '/' + id);
  }

  public createBasicTier(data: IJsonApiPostItem<IWBasicTierAttributes>): Observable<IJsonApiItemPayload<IWBasicTierAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWBasicTierAttributes>>(this.apiConfig.loyaltyBasicTierPath, data);
  }

  public updateBasicTier(
    id: string,
    data: IJsonApiPatchItem<IWBasicTierAttributes>
  ): Observable<IJsonApiItemPayload<IWBasicTierAttributes>> {
    return this.http.patch<IJsonApiItemPayload<IWBasicTierAttributes>>(this.apiConfig.loyaltyBasicTierPath + '/' + id, data);
  }

  public deleteBasicTier(id: string): Observable<void> {
    return this.http.delete<void>(this.apiConfig.loyaltyBasicTierPath + '/' + id);
  }

  public getCustomTier(id: string, params: HttpParams): Observable<IJsonApiItemPayload<IWCustomTierAttributes>> {
    return this.http.get<IJsonApiItemPayload<IWCustomTierAttributes>>(`${this.apiConfig.getLoyaltyCustomTierPath}/${id}`, { params });
  }

  public getCustomTiers(params: HttpParams): Observable<IJsonApiListPayload<IWCustomTierAttributes>> {
    return this.http.get<IJsonApiListPayload<IWCustomTierAttributes>>(this.apiConfig.getLoyaltyCustomTierPath, { params });
  }

  public createCustomTier(data: IJsonApiPostItem<IWCustomTierAttributes>): Observable<IJsonApiItemPayload<IWCustomTierAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWCustomTierAttributes>>(this.apiConfig.getLoyaltyCustomTierPath, data);
  }

  public updateCustomTier(id: string, data: IJsonApiPatchItem<IWCustomTierAttributes>):
    Observable<IJsonApiItemPayload<IWCustomTierAttributes>> {
    return this.http.patch<IJsonApiItemPayload<IWCustomTierAttributes>>(this.apiConfig.getLoyaltyCustomTierPath + '/' + id, data);
  }

  public deleteCustomTier(id: string): Observable<void> {
    return this.http.delete<void>(this.apiConfig.getLoyaltyCustomTierPath + '/' + id);
  }
}
