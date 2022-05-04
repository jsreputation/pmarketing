import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IMerchantsService } from './imerchants.service';
import { IImage, IMerchant, IOutlet, ITag } from './models/merchants.model';
import { oc } from 'ts-optchain';
import { ConfigService } from '../config/config.service';
import { IConfig } from '../config/models/config.model';
import { Cacheable } from 'ngx-cacheable';
import { IV4MerchantLocation } from '../vouchers/v4-vouchers.service';
import { IMerchantLocation } from '../vouchers/models/voucher.model';

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
  private merchantsWithoutId: IV4Merchant[] = [];
  private apiHost: string;

  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) {
    this.configService.readAppConfig().subscribe(
      (config: IConfig<void>) => {
        this.apiHost = config.apiHost as string;
      });
  }

  public static v4MerchantLocationToLocation(v: IV4MerchantLocation): IMerchantLocation {
    return {
      id: v.id,
      name: v.name,
      latitude: v.latitude,
      longitude: v.longitude,
      phoneNumber: v.phone_number,
      address1: v.address1,
      address2: v.address2,
      city: v.city,
      country: v.country,
      postalCode: v.postal_code
    };
  }

  public static v4OutletsToOutlets(outlets: IV4Outlet[] | undefined): IOutlet[] | null {
    if (!outlets) {
      console.log('Data to map outlet is not valid');
      return null;
    }
    return outlets.map(
      (outlet: IV4Outlet) => ({
        outletId: outlet.outlet_id,
        outletName: outlet.outlet_name,
        outletAddress1: outlet.outlet_address1,
        outletAddress2: oc(outlet).outlet_address2(),
        outletAddress3: oc(outlet).outlet_address3(),
        postalCode: oc(outlet).postal_code(),
        tel: outlet.tel,
        coordinates: outlet.coordinates,
        tags: oc(outlet).tags()
      })
    );
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
      return this.getMerchants(1, false).subscribe(process);
    });
  }

  public getMerchants(page: number = 1, useCache: boolean = true): Observable<IMerchant[]> {
    if (useCache && this.merchantsWithoutId.length > 0) {
      return of(this.merchantsWithoutId.map((merchant: IV4Merchant) => ({
        ...merchant,
        outlets: V4MerchantsService.v4OutletsToOutlets(merchant.outlets)
      })));
    }

    return this.http.get<IV4GetMerchantsResponse>(
      `${this.apiHost}/v4/merchants`,
      {
        params: {
          page: `${page}`
        }
      }
    ).pipe(
      map((res: IV4GetMerchantsResponse) => {
        this.merchantsWithoutId = res.data;
        return res.data;
      }),
      map((merchants: IV4Merchant[]) => merchants.map((merchant: IV4Merchant) => ({
        ...merchant,
        outlets: V4MerchantsService.v4OutletsToOutlets(merchant.outlets)
      }))),
    );
  }

  @Cacheable({})
  public getMerchant(merchantId: number, page?: number): Observable<IMerchant> {
    page = page || 1;
    return this.http.get<IV4GetMerchantResponse>(`${this.apiHost}/v4/merchants/${merchantId}?page=${page}`)
      .pipe(
        map(res => res.data),
        map((merchant: IV4Merchant) => ({
          ...merchant,
          outlets: V4MerchantsService.v4OutletsToOutlets(merchant.outlets)
        }))
      );
  }
}
