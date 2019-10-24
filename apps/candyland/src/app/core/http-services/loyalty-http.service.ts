import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfig } from '@cl-core/api-config';
import {ILoyaltyApi, IBasicTierApi, ICustomTierApi} from '@perx/core';

@Injectable({
  providedIn: 'root'
})
export class LoyaltyHttpService {

  constructor(private http: HttpClient) {
  }

  public getLoyalty(id: string, params: HttpParams): Observable<IJsonApiPayload<ILoyaltyApi>> {
    return this.http.get<IJsonApiPayload<any>>(`${ApiConfig.loyaltyPath}/${id}`, {params});
  }

  public getLoyalties(params: HttpParams): Observable<IJsonApiListPayload<ILoyaltyApi>> {
    return this.http.get<IJsonApiListPayload<ILoyaltyApi>>(ApiConfig.loyaltyPath, {params});
  }

  public createLoyalty(data: IJsonApiPayload<ILoyaltyApi>): Observable<IJsonApiPayload<ILoyaltyApi>> {
    return this.http.post<IJsonApiPayload<ILoyaltyApi>>(ApiConfig.loyaltyPath + '/', data);
  }

  public updateLoyalty(id: string, data: IJsonApiPayload<ILoyaltyApi>): Observable<IJsonApiPayload<ILoyaltyApi>> {
    return this.http.patch<IJsonApiPayload<ILoyaltyApi>>(ApiConfig.loyaltyPath + '/' + id, data);
  }

  public deleteLoyalty(id: string): Observable<IJsonApiPayload<ILoyaltyApi>> {
    return this.http.delete<IJsonApiPayload<ILoyaltyApi>>(ApiConfig.loyaltyPath + '/' + id);
  }

  public createBasicTier(data: IJsonApiPayload<IBasicTierApi>): Observable<IJsonApiPayload<IBasicTierApi>> {
    return this.http.post<IJsonApiPayload<IBasicTierApi>>(ApiConfig.loyaltyBasicTierPath, data);
  }

  public updateBasicTier(id: string, data: IJsonApiPayload<IBasicTierApi>): Observable<IJsonApiPayload<IBasicTierApi>> {
    return this.http.patch<IJsonApiPayload<IBasicTierApi>>(ApiConfig.loyaltyBasicTierPath + '/' + id, data);
  }

  public deleteBasicTier(id: string): Observable<IJsonApiPayload<IBasicTierApi>> {
    return this.http.delete<IJsonApiPayload<any>>(ApiConfig.loyaltyBasicTierPath + '/' + id);
  }

  public getCustomTier(id: string, params: HttpParams): Observable<IJsonApiPayload<ICustomTierApi>> {
    return this.http.get<IJsonApiPayload<ICustomTierApi>>(`${ApiConfig.getLoyaltyCustomTierPath}/${id}`, {params});
  }

  public getCustomTiers(params: HttpParams): Observable<IJsonApiListPayload<ICustomTierApi>> {
    return this.http.get<IJsonApiListPayload<ICustomTierApi>>(ApiConfig.getLoyaltyCustomTierPath, {params});
  }

  public createCustomTier(data: IJsonApiPayload<ICustomTierApi>): Observable<IJsonApiPayload<ICustomTierApi>> {
    return this.http.post<IJsonApiPayload<ICustomTierApi>>(ApiConfig.getLoyaltyCustomTierPath, data);
  }

  public updateCustomTier(id: string, data: IJsonApiPayload<ICustomTierApi>): Observable<IJsonApiPayload<ICustomTierApi>> {
    return this.http.patch<IJsonApiPayload<ICustomTierApi>>(ApiConfig.getLoyaltyCustomTierPath + '/' + id, data);
  }

  public deleteCustomTier(id: string): Observable<IJsonApiPayload<ICustomTierApi>> {
    return this.http.delete<IJsonApiPayload<ICustomTierApi>>(ApiConfig.getLoyaltyCustomTierPath + '/' + id);
  }
}
