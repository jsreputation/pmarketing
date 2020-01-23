import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IJsonApiItemPayload,
  IJsonApiListPayload,
  IJsonApiPostItem,
  IJsonApiPatchItem,
  IWLoyaltyCard
} from '@perx/whistler';
import { ApiConfigServices } from '../configs/api-config';

@Injectable()
export class LoyaltyCardHttpService {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigServices
  ) { }

  public getLoyaltyCard(id: string, params: HttpParams): Observable<IJsonApiItemPayload<IWLoyaltyCard>> {
    return this.http.get<IJsonApiItemPayload<IWLoyaltyCard>>(`${this.apiConfig.getLoyaltyCards}/${id}`, { params });
  }

  public getLoyaltyCards(params: HttpParams): Observable<IJsonApiListPayload<IWLoyaltyCard>> {
    return this.http.get<IJsonApiListPayload<IWLoyaltyCard>>(this.apiConfig.getLoyaltyCards, { params });
  }

  public createLoyaltyCard(data: IJsonApiPostItem<IWLoyaltyCard>): Observable<IJsonApiItemPayload<IWLoyaltyCard>> {
    return this.http.post<IJsonApiItemPayload<IWLoyaltyCard>>(`${this.apiConfig.getLoyaltyCards}/`, data);
  }

  public updateLoyaltyCard(id: string, data: IJsonApiPatchItem<IWLoyaltyCard>): Observable<IJsonApiItemPayload<IWLoyaltyCard>> {
    return this.http.patch<IJsonApiItemPayload<IWLoyaltyCard>>(`${this.apiConfig.getLoyaltyCards}/${id}`, data);
  }

  public deleteLoyaltyCard(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiConfig.getLoyaltyCards}/${id}`);
  }
}
