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
        let filteredMerchants: IMerchant[] | null = null;
        if (tags && tags.length > 0) {
          filteredMerchants = merchants.filter(merchant => {
            let found = false;
            if (merchant.tags) {
              const merchantTagNames: string[] = merchant.tags.map(t => t.name.toLowerCase());
              // @ts-ignore
              found = tags.some(tag => merchantTagNames.includes(tag.toLowerCase()));
            }
            return found;
          });
        }

        filteredMerchants = filteredMerchants ? filteredMerchants : merchants;
        return filteredMerchants.map((merchant: IMerchant) => this.getFromMerchant(merchant.id));
      }),
      mergeAll(5),
      scan((acc: ILocation[], curr: ILocation[]) => acc.concat(curr), []),
      map((locations: ILocation[]) => locations
        .sort((locationA, locationB) => {
          if (locationA.merchantName && locationB.merchantName) {
            return locationA.merchantName < locationB.merchantName ? -1 : 1;
          }
          return 0;
        })
      ),
      share()
    );
  }

  public getLocations(page?: number, tags?: string[]): Observable<ILocation[]> {
    if (page === undefined) {
      page = 1;
    }
    if (tags === undefined) {
      tags = [];
    }
    return this.merchantsService.getMerchants(page).pipe(
      mergeMap((merchants: IMerchant[]) => {
        let filteredMerchants: IMerchant[] | undefined;
        if (tags && tags.length > 0) {
          filteredMerchants = merchants.filter(merchant => {
            let found = false;
            if (merchant.tags !== undefined) {
              const tagNames: string[] = merchant.tags.map(t => t.name.toLowerCase());
              // @ts-ignore
              found = tags.some(tag => tagNames.includes(tag.toLowerCase()));
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
      filter((merchant: IMerchant) => (merchant.outlets !== undefined && (merchant.outlets ? merchant.outlets.length > 0 : false))),
      // @ts-ignore
      map((merchant: IMerchant) => merchant.outlets.map((outlet: IOutlet) => ({
        merchantId: merchant.id,
        merchantName: merchant.name,
        locationId: outlet.outletId,
        name: outlet.outletName,
        tags: outlet.tags && outlet.tags.map(tag => tag.name),
        address: outlet.outletAddress1,
        address2: outlet.outletAddress2,
        address3: outlet.outletAddress3,
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
      // eslint-disable-next-line arrow-body-style
      map((merchants: IMerchant[]): string[] => {
        return merchants.map((merchant: IMerchant) => merchant.tags ? merchant.tags.map(tag => tag.name) : [])
          .reduce((p, v) => v.concat(p), []);
      }),
      scan((acc: string[], curr: string[]) => acc.concat(...curr), []),
      map((tags: string[]) => [...new Set(tags)])
    );
  }
}
