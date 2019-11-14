import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, EMPTY } from 'rxjs';
import { map, tap, expand, finalize } from 'rxjs/operators';
import { IMerchantsService } from './imerchants.service';
import { IMerchant } from './models/merchants.model';
import { Config } from '../config/config';

import {
  IJsonApiListPayload,
  IJsonApiItem,
  IJsonApiItemPayload,
  IMeta,
  IWMerchantAttributes,
} from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class WhistlerMerchantsService implements IMerchantsService {
  private merchants: { [k: number]: IMerchant } = {};
  private historyMeta: IMeta = {};

  constructor(
    private http: HttpClient,
    private config: Config
  ) {
  }

  private static WMerchantToMerchant(merchant: IJsonApiItem<IWMerchantAttributes>): IMerchant {
    return {
      id: (typeof merchant.id === 'string') ? Number.parseInt(merchant.id, 10) : merchant.id,
      name: merchant.attributes.name,
      description: merchant.attributes.description,
      images: merchant.attributes.properties.logo_image ? [
        {
          type: 'banner',
          url: merchant.attributes.properties.logo_image
        }
      ] : []
    };
  }

  public getAllMerchants(): Observable<IMerchant[]> {
    let i = 1;
    const current = {};
    return new Observable((sub) => {
      this.getMerchantsPage(i).pipe(
        expand((response) =>
          (response.meta && response.meta.page_count && response.meta.page_count > i) ? this.getMerchantsPage(++i) : EMPTY
        ),
        map((value) => value.data.map((el) => WhistlerMerchantsService.WMerchantToMerchant(el))),
        tap((data) => data.forEach((el) => current[el.id] = el)),
        finalize(() => this.merchants = current)
      ).subscribe(() => {
        sub.next(Object.values(Object.assign(current, this.merchants)));
      });
    });
  }

  private getMerchantsPage(page: number): Observable<IJsonApiListPayload<IWMerchantAttributes>> {
    const pageSize: number = 10;
    const params = {
      page_number: `${page}`,
      page_size: `${pageSize}`
    };
    return this.http.get<IJsonApiListPayload<IWMerchantAttributes>>(
      `${this.config.apiHost}/organization/orgs`,
      { params }
    );
  }

  public getMerchants(page: number = 1): Observable<IMerchant[]> {
    const pageSize: number = 10;

    return this.http.get<IJsonApiListPayload<IWMerchantAttributes>>(
      `${this.config.apiHost}/organization/orgs`,
      {
        params: {
          page_number: `${page}`,
          page_size: `${pageSize}`
        }
      }
    ).pipe(
      map((res: IJsonApiListPayload<IWMerchantAttributes>) => {
        if (res.meta) {
          this.historyMeta = {
            ...this.historyMeta,
            ...res.meta
          };
        }

        return res.data;
      }),
      map((merchants: IJsonApiItem<IWMerchantAttributes>[]) => merchants.map(
        res => WhistlerMerchantsService.WMerchantToMerchant(res)
      ))
    );
  }

  public getMerchant(merchantId: number): Observable<IMerchant> {
    if (this.merchants[merchantId]) {
      return of(this.merchants[merchantId]);
    }

    return this.http.get<IJsonApiItemPayload<IWMerchantAttributes>>(
      `${this.config.apiHost}/organization/orgs/${merchantId}`
    ).pipe(
      map((res: IJsonApiItemPayload<IWMerchantAttributes>) => WhistlerMerchantsService.WMerchantToMerchant(res.data)),
      tap((merchant: IMerchant) => this.merchants[merchantId] = merchant)
    );
  }
}
