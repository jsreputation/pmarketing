import { Injectable } from '@angular/core';
import { Merchant } from '@cl-core/http-adapters/merchant';
import { MerchantsDatastore } from '@cl-core/http-adapters/merchants-datastore';
import { MerchantHttpService } from '@cl-core/http-services/merchant-http.service';
import { ITableService } from '@cl-shared/table/data-source/table-service-interface';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MerchantsService implements ITableService {

  constructor(private merchantHttpService: MerchantHttpService,
              private datastore: MerchantsDatastore) {
  }

  public getTableData(params: any): Observable<any> {
    return this.datastore.findAll<Merchant>(Merchant, params)
      .pipe(
        tap(data => console.log('merchant', data)),
        map(response => ({data: response.getModels(), meta: response.getMeta().meta}))
      );
    // return this.settingsHttpService.getAllIMAUsers(params)
    //   .pipe(
    //     map((res: any) => SettingsHttpAdapter.transformToTableData(res))
    //   );
  }

  public getMerchant(): Observable<IMerchant[]> {
    return this.merchantHttpService.getMerchants()
      .pipe(
        map((res: IMerchant[]) => res)
      );
  }

  public getMerchantList(): Observable<IMerchant[]> {
    return this.merchantHttpService.getMerchantList()
      .pipe(
        map((res: IMerchant[]) => res)
      );
  }
}
