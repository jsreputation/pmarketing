import { Injectable } from '@angular/core';

import {
  forkJoin,
  Observable
} from 'rxjs';
import {
  map,
  mergeMap,
  filter,
  scan,
  mergeAll,
  share
} from 'rxjs/operators';

import { ILocation } from './ilocation';
import { LocationsService } from './locations.service';

import { IMerchantsService } from '../merchants/imerchants.service';
import {
  IMerchant,
  IOutlet,
} from '../merchants/models/merchants.model';

@Injectable({
  providedIn: 'root'
})
export class V4LocationsService extends LocationsService {

  constructor(
    private merchantsService: IMerchantsService
  ) {
    super();
  }

  public getAllLocations(allMerchants: Observable<IMerchant[]>, tags?: string[]): Observable<ILocation[]> {
    if (tags === undefined) {
      tags = [];
    }
    return forkJoin(allMerchants).pipe(
      mergeMap((merchantsArr: IMerchant[][]) => {
        const merchants: IMerchant[] = merchantsArr[0];
        let filteredMerchants: IMerchant[] = null;
        if (tags && tags.length > 0) {
          filteredMerchants = merchants.filter(merchant => {
            let found = false;
            if (merchant.tags) {
              found = tags.some(tag => merchant.tags.map(t => t.name.toLowerCase()).includes(tag.toLowerCase()));
            }
            return found;
          });
        }

        filteredMerchants = filteredMerchants ? filteredMerchants : merchants;

        return filteredMerchants.map((merchant: IMerchant) => this.getFromMerchant(merchant.id));
      }),
      mergeAll(5),
      scan((acc: ILocation[], curr: ILocation[]) => acc.concat(curr), []),
      share()
    );
  }

  public getLocations(page?: number, tags?: string[]): Observable<ILocation[]> {
    if (page === undefined) {
      page = 1;
    }
    if (tags) {
      tags = [];
    }
    return this.merchantsService.getMerchants(page).pipe(
      mergeMap((merchants: IMerchant[]) => {
        let filteredMerchants: IMerchant[];
        if (tags && tags.length > 0) {
          filteredMerchants = merchants.filter(merchant => {
            let found = false;
            if (merchant.tags) {
              found = tags.some(tag => merchant.tags.map(t => t.name.toLowerCase()).includes(tag.toLowerCase()));
            }
            return found;
          });
        }

        filteredMerchants = filteredMerchants ? filteredMerchants : merchants;

        return filteredMerchants.map((merchant: IMerchant) => this.getFromMerchant(merchant.id));
      }),
      mergeAll(5),
      scan((acc: ILocation[], curr: ILocation[]) => acc.concat(curr), [])
    );
  }

  public getFromMerchant(merchantId: number, page?: number): Observable<ILocation[]> {
    return this.merchantsService.getMerchant(merchantId, true, page).pipe(
      filter((merchant: IMerchant) => merchant.outlets && merchant.outlets.length > 0),
      map((merchant: IMerchant) => merchant.outlets.map((outlet: IOutlet) => ({
        merchantId: merchant.id,
        merchantName: merchant.name,
        locationId: outlet.outlet_id,
        name: outlet.outlet_name,
        tags: outlet.tags && outlet.tags.map(tag => tag.name),
        address: outlet.outlet_address1,
        address2: outlet.outlet_address2,
        address3: outlet.outlet_address3,
        latitude: outlet.coordinates.lat,
        longitude: outlet.coordinates.lng,
        phone: outlet.tel
      })))
    );
  }

  public getTags(allMerchants: Observable<IMerchant[]>): Observable<string[]> {
    return allMerchants.pipe(
      map((merchants: IMerchant[]) => merchants.filter((merchant: IMerchant) => merchant.tags && merchant.tags.length > 0)),
      filter((merchants: IMerchant[]) => merchants.length > 0),
      map((merchants: IMerchant[]) => {
        let tags = [];
        tags = [...merchants.map((merchant: IMerchant) => merchant.tags.map(tag => tag.name))];
        return tags;
      }),
      scan((acc: string[], curr: string[]) => acc.concat(...curr), []),
      map((tags: string[]) => [...new Set(tags)])
    );
  }
}
