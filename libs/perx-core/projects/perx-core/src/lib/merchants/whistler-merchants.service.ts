import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, mergeMap, mergeAll } from 'rxjs/operators';
import { IMerchantsService } from './imerchants.service';
import { IMeta, IMerchant } from './models/merchants.model';
import { Config } from '../config/config';
import { IJsonApiListPayload, IJsonApiItem, IJsonApiItemPayload } from './../jsonapi.payload';

interface IWMerchant {
  urn: string;
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
  properties: any;
}

@Injectable({
  providedIn: 'root'
})
export class WhistlerMerchantsService implements IMerchantsService {
  private historyMeta: IMeta = {};

  constructor(
    private http: HttpClient,
    private config: Config
  ) {
  }

  private static WMerchantToMerchant(merchant: IJsonApiItem<IWMerchant>): IMerchant {
    return {
      id: (typeof merchant.id === 'string') ? Number.parseInt(merchant.id, 10) : merchant.id,
      name: merchant.attributes.name,
      description: merchant.attributes.description,
      images: [
        {
          type: 'banner',
          url: merchant.attributes.properties.img_url
        }
      ]
    };
  }

  public getAllMerchants(): Observable<IMerchant[]> {
    const pageSize = 10;
    return this.getMerchants(1, pageSize).pipe(
      mergeMap((merchants: IMerchant[]) => {
        const streams = [
          of(merchants)
        ];

        for (let i = 2; i <= this.historyMeta.total_pages; i++) {
          const stream = this.getMerchants(i, pageSize);
          streams.push(stream);
        }

        return streams;
      }),
      mergeAll(5),
    );
  }

  public getMerchants(page: number = 1, pageSize: number = 10): Observable<IMerchant[]> {
    return this.http.get<IJsonApiListPayload<IWMerchant>>(
      `${this.config.apiHost}/organization/orgs`,
      {
        params: {
          page_number: `${page}`,
          page_size: `${pageSize}`
        }
      }
    ).pipe(
      map((res: IJsonApiListPayload<IWMerchant>) => {
        if (res.meta) {
          this.historyMeta = {
            ...this.historyMeta,
            ...res.meta
          };
        }

        return res.data;
      }),
      map((merchants: IJsonApiItem<IWMerchant>[]) => merchants.map(
        res => WhistlerMerchantsService.WMerchantToMerchant(res)
      ))
    );
  }

  public getMerchant(merchantId: number): Observable<IMerchant> {
    return this.http.get<IJsonApiItemPayload<IWMerchant>>(
      `${this.config.apiHost}/organization/orgs/${merchantId}`
    ).pipe(
      map((res: IJsonApiItemPayload<IWMerchant>) => WhistlerMerchantsService.WMerchantToMerchant(res.data))
    );
  }

}
