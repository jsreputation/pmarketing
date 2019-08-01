import { Injectable } from '@angular/core';
import { LocationsService } from './locations.service';
import { Observable, of } from 'rxjs';
import { ILocation } from './ilocation';
import { HttpClient } from '@angular/common/http';
import { EnvConfig } from '../shared/env-config';
import { map, mergeMap, concatAll, reduce, filter } from 'rxjs/operators';

interface IV4Meta {
  count?: number;
  size?: number;
  total_pages?: number;
  page?: number;
}

interface IV4Tag {
  id: number;
  name: string;
}

interface IV4Image {
  type: string;
  url: string;
}

interface IV4Outlet {
  outlet_id: number;
  outlet_name: string;
  outlet_address1: string;
  outlet_address2: string;
  outlet_address3: string;
  postal_code: string;
  tel: string;
  coordinates: {lat: number, lng: number, distance?: number, unit_of_measure: string};
  tags?: IV4Tag[];
}

interface IV4Merchant {
  id: number;
  name: string;
  website?: string;
  tags?: IV4Tag[];
  images?: IV4Image[];
  outlets?: IV4Outlet[];
}

interface IV4GetMerchantsResponse {
  data: IV4Merchant[];
  meta?: IV4Meta;
}

interface IV4GetMerchantResponse {
  data: IV4Merchant;
}

@Injectable({
  providedIn: 'root'
})
export class V4LocationsService extends LocationsService {
  private apiHost: string;
  private historyMeta: IV4Meta = {};

  constructor(
    private http: HttpClient,
    config: EnvConfig
  ) {
    super();
    this.apiHost = config.env.apiHost as string;
  }

  // @ts-ignore
  public getAll(tags: string[] = []): Observable<ILocation[]> {
    const pageSize = 100;
    return this.getLocations(1, pageSize).pipe(
      mergeMap((merchants: ILocation[]) => {
        const streams = [
          of(merchants)
        ];
        for (let i = 2; i <= this.historyMeta.total_pages; i++) {
          const stream = this.getLocations(i, pageSize);
          streams.push(stream);
        }
        return streams;
      }),
      concatAll(),
      reduce((acc: ILocation[], curr: ILocation[]) => acc.concat(curr), [])
    );
  }

  public getLocations(page: number = 1, pageSize: number = 25): Observable<ILocation[]> {
    return this.http.get<IV4GetMerchantsResponse>(
      `${this.apiHost}/v4/merchants`,
      {
        params: {
          page: `${page}`,
          size: `${pageSize}`
        }
      }
    ).pipe(
      map((res: IV4GetMerchantsResponse) => {
        if (res.meta) {
          this.historyMeta = {
            ...this.historyMeta,
            ...res.meta
          };
        }

        return res.data;
      }),
      mergeMap((merchants: IV4Merchant[]) => {
        const streams = merchants.map((merchant: IV4Merchant) => {
          return this.getMerchant(merchant.id);
        });

        return streams;
      }),
      concatAll()
    );
  }

  private getMerchant(id: number): Observable<ILocation[]> {
    return this.http.get<IV4GetMerchantResponse>(
      `${this.apiHost}/v4/merchants/${id}`
    ).pipe(
      map((res: IV4GetMerchantResponse) => res.data),
      filter((merchant: IV4Merchant) => merchant.outlets && merchant.outlets.length > 0),
      map((merchant: IV4Merchant) => {
        return merchant.outlets.map((outlet: IV4Outlet) => ({
          merchantId: merchant.id,
          locationId: outlet.outlet_id,
          name: outlet.outlet_name,
          tags: outlet.tags && outlet.tags.map(tag => tag.name),
          address: outlet.outlet_address1,
          address2: outlet.outlet_address2,
          address3: outlet.outlet_address3,
          latitude: outlet.coordinates.lat,
          longitude: outlet.coordinates.lng,
          phone: outlet.tel
        }));
      })
    );
  }
}
