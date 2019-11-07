import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, EMPTY } from 'rxjs';
import { map, tap, expand, finalize } from 'rxjs/operators';
import { IMerchantsService } from './imerchants.service';
import { IMerchant } from './models/merchants.model';
import { Config } from '../config/config';

import {
  IWMerchant,
  IWJsonApiListPayload,
  IWJsonApiItem,
  IWJsonApiItemPayload,
  IWMeta,
} from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class WhistlerMerchantsService implements IMerchantsService {
  private merchants: { [k: number]: IMerchant } = {};
  private historyMeta: IWMeta = {};

  constructor(
    private http: HttpClient,
    private config: Config
  ) {
  }

  private static WMerchantToMerchant(merchant: IWJsonApiItem<IWMerchant>): IMerchant {
    return {
      id: (typeof merchant.id === 'string') ? Number.parseInt(merchant.id, 10) : merchant.id,
      name: merchant.attributes.name,
      description: merchant.attributes.description,
      images: [
        {
          type: 'banner',
          url: merchant.attributes.properties.logo_image
        }
      ]
    };
  }

  public getAllMerchants(): Observable<IMerchant[]> {
    let i = 1;
    const current = {};
    return new Observable((sub) => {
      this.getMerchantsPage(i).pipe(
        expand((response) => i < (response.meta && response.meta.page_count) ? this.getMerchantsPage(++i) : EMPTY),
        map((value) => value.data.map((el) => WhistlerMerchantsService.WMerchantToMerchant(el))),
        tap((data) => data.forEach((el) => current[el.id] = el)),
        finalize(() => this.merchants = current)
      ).subscribe(() => {
        sub.next(Object.values(Object.assign(current, this.merchants)));
      });
    });
  }

  private getMerchantsPage(page: number): Observable<IWJsonApiListPayload<IWMerchant>> {
    const pageSize: number = 10;
    const params = {
      page_number: `${page}`,
      page_size: `${pageSize}`
    };
    return this.http.get<IWJsonApiListPayload<IWMerchant>>(
      `${this.config.apiHost}/organization/orgs`,
      { params }
    );
  }

  public getMerchants(page: number = 1): Observable<IMerchant[]> {
    const pageSize: number = 10;

    return this.http.get<IWJsonApiListPayload<IWMerchant>>(
      `${this.config.apiHost}/organization/orgs`,
      {
        params: {
          page_number: `${page}`,
          page_size: `${pageSize}`
        }
      }
    ).pipe(
      map((res: IWJsonApiListPayload<IWMerchant>) => {
        if (res.meta) {
          this.historyMeta = {
            ...this.historyMeta,
            ...res.meta
          };
        }

        return res.data;
      }),
      map((merchants: IWJsonApiItem<IWMerchant>[]) => merchants.map(
        res => WhistlerMerchantsService.WMerchantToMerchant(res)
      ))
    );
  }

  public getMerchant(merchantId: number): Observable<IMerchant> {
    if (this.merchants[merchantId]) {
      return of(this.merchants[merchantId]);
    }

    return this.http.get<IWJsonApiItemPayload<IWMerchant>>(
      `${this.config.apiHost}/organization/orgs/${merchantId}`
    ).pipe(
      map((res: IWJsonApiItemPayload<IWMerchant>) => WhistlerMerchantsService.WMerchantToMerchant(res.data)),
      tap((merchant: IMerchant) => this.merchants[merchantId] = merchant)
    );
  }
}
