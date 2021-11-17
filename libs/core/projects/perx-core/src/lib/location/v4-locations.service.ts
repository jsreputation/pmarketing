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
import { HttpClient, HttpParams } from '@angular/common/http';
import { ConfigService } from '../config/config.service';
import { IConfig } from '../config/models/config.model';
import { IV4MerchantLocation } from '../vouchers/v4-vouchers.service';
import { V4MerchantsService } from '../merchants/v4-merchants.service';
import { IMerchantLocation } from '../vouchers/models/voucher.model';

export interface IV4MerchantLocationResponse {
  data: IV4MerchantLocation[];
  meta: {
    count: number;
    page: number;
    size: number;
  }
}

@Injectable({
  providedIn: 'root'
})
export class V4LocationsService extends LocationsService {

  private baseUrl: string;


  constructor(
    private merchantsService: IMerchantsService,
    private http: HttpClient,
    private configService: ConfigService
  ) {
    super();
    this.configService
      .readAppConfig()
      .subscribe(
        (config: IConfig<any>) => (this.baseUrl = config.apiHost as string)
      );
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
    return this.merchantsService.getMerchant(merchantId, page).pipe(
      filter((merchant: IMerchant) => (merchant.outlets !== undefined && (merchant.outlets ? merchant.outlets.length > 0 : false))),
      map((merchant: IMerchant) => {
        const seenLocations = {};
        // @ts-ignore
        return merchant.outlets.reduce((merchantOutlets: ILocation[], outlet: IOutlet) => {
          if (!seenLocations[outlet.outletId]) {
            seenLocations[outlet.outletId] = true;
            return [...merchantOutlets, {
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
            }];
          }
          return merchantOutlets;
        }, []);
      })
    );
  }

  public getMerchantLocationsFromCampaign(campaignId: number, page?: number, pageSize?: number): Observable<IMerchantLocation[]> {
    let params = new HttpParams();
    if (page) {
      params = params.set('page', page.toString());
    }
    if (pageSize) {
      params = params.set('size', pageSize.toString());
    }
    return this.http.get<IV4MerchantLocationResponse>(`${this.baseUrl}/v4/campaigns/${campaignId}/merchant_locations`, { params }).pipe(
      map((res: IV4MerchantLocationResponse) => res.data),
      map((locations: IV4MerchantLocation[]) => locations.map(
        (location: IV4MerchantLocation) => V4MerchantsService.v4MerchantLocationToLocation(location)
      ))
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
