import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ILocation } from './ilocation';

import { IMerchant } from '../merchants/models/merchants.model';
import { IMerchantLocation } from '../vouchers/models/voucher.model';

@Injectable({
  providedIn: 'root'
})
export abstract class LocationsService {
  public abstract getAllLocations(merchants: Observable<IMerchant[]>, tags?: string[]): Observable<ILocation[]>;

  public abstract getLocations(page?: number, tags?: string[]): Observable<ILocation[]>;

  public abstract getTags(merchants: Observable<IMerchant[]>): Observable<string[]>;

  public abstract getFromMerchant(merchantId: number, page?: number): Observable<ILocation[]>;

  public abstract getMerchantLocationsFromCampaign(campaignId: number, page?: number, pageSize?: number): Observable<IMerchantLocation[]>;

}
