import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfig } from '@cl-core/api-config';
import {
  IJsonApiItemPayload,
  IJsonApiListPayload,
  IJsonApiPostItem,
  IJsonApiPatchItem,
  IWLoyaltyCard
} from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class LoyaltyCardHttpService {

  constructor(private http: HttpClient) {
  }

  public getLoyaltyCard(id: string, params: HttpParams): Observable<IJsonApiItemPayload<IWLoyaltyCard>> {
    return this.http.get<IJsonApiItemPayload<IWLoyaltyCard>>(`${ApiConfig.getLoyaltyCards}/${id}`, { params });
  }

  public getLoyaltyCards(params: HttpParams): Observable<IJsonApiListPayload<IWLoyaltyCard>> {
    return this.http.get<IJsonApiListPayload<IWLoyaltyCard>>(ApiConfig.getLoyaltyCards, { params });
  }

  public createLoyaltyCard(data: IJsonApiPostItem<IWLoyaltyCard>): Observable<IJsonApiItemPayload<IWLoyaltyCard>> {
    return this.http.post<IJsonApiItemPayload<IWLoyaltyCard>>(ApiConfig.getLoyaltyCards + '/', data);
  }

  public updateLoyaltyCard(id: string, data: IJsonApiPatchItem<IWLoyaltyCard>): Observable<IJsonApiItemPayload<IWLoyaltyCard>> {
    return this.http.patch<IJsonApiItemPayload<IWLoyaltyCard>>(ApiConfig.getLoyaltyCards + '/' + id, data);
  }

  public deleteLoyaltyCard(id: string): Observable<void> {
    return this.http.delete<void>(ApiConfig.getLoyaltyCards + '/' + id);
  }
}
