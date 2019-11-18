import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IMerchantsService } from './imerchants.service';
import {IImage, IMerchant, IOutlet, ITag} from './models/merchants.model';
import { Config } from '../config/config';
import {oc} from 'ts-optchain';

interface IV4GetMerchantsResponse {
  data: IV4Merchant[];
}

interface IV4GetMerchantResponse {
  data: IV4Merchant;
}

interface IV4Merchant {
  id: number;
  name: string;
  description?: string;
  website?: string;
  tags?: ITag[];
  images?: IImage[];
  outlets?: IV4Outlet[];
}

interface IV4Outlet {
  outlet_id: number;
  outlet_name: string;
  outlet_address1: string;
  outlet_address2?: string;
  outlet_address3?: string;
  state?: string;
  city?: string;
  shopping_mall?: string;
  postal_code?: string;
  country: string;
  tel: string;
  coordinates: { lat: number, lng: number, distance?: number, unitOfMeasure: string };
  tags?: ITag[];
}

@Injectable({
  providedIn: 'root'
})
export class V4MerchantsService implements IMerchantsService {
  private merchants: { [id: number]: { [page: number]: IMerchant } } = {};
  private merchantsWithoutId: IMerchant[] = [];

  constructor(
    private http: HttpClient,
    private config: Config
  ) {
  }

  public getAllMerchants(): Observable<IMerchant[]> {
    return new Observable(subject => {
      let current: IMerchant[] = [];
      const pageSize: number = 25;
      let page: number = 1;
      // we do not want to get all pages in parallel, so we get pages one after the other in order not to ddos the server
      const process = (res: IMerchant[]) => {
        current = current.concat(res);
        subject.next(current);
        // if finished close the stream
        if (res.length < pageSize) {
          subject.complete();
        } else {
          // otherwise get next page
          page++;
          this.getMerchants(page, false)
            .subscribe(process);
        }
      };
      // do the first query
      this.getMerchants(1, false)
        .subscribe(process);
    });
  }

  public getMerchants(page: number = 1, useCache: boolean = true): Observable<IMerchant[]> {
    if (useCache && this.merchantsWithoutId.length > 0) {
      return of(this.merchantsWithoutId);
    }

    return this.http.get<IV4GetMerchantsResponse>(
      `${this.config.apiHost}/v4/merchants`,
      {
        params: {
          page: `${page}`
        }
      }
    ).pipe(
      map((res: IV4GetMerchantsResponse) => {
        this.merchantsWithoutId = res.data;
        return res.data;
      })
    );
  }

  public getMerchant(merchantId: number, useCache?: boolean, page?: number): Observable<IMerchant> {
    if (useCache === undefined) {
      useCache = true;
    }
    page = page || 1;

    if (useCache && this.merchants[merchantId] && this.merchants[merchantId][page]) {
      return of(this.merchants[merchantId][page]);
    }

    return this.http.get<IV4GetMerchantResponse>(`${this.config.apiHost}/v4/merchants/${merchantId}?page=${page}`)
      .pipe(
        map(res => res.data),
        tap((merchant: IMerchant) => {
          if (!this.merchants[merchantId]) {
            this.merchants[merchantId] = {};
          }
          //  make sure that page is a number
          page = page || 1;
          this.merchants[merchant.id][page] = merchant;
        })
      );
  }
}
