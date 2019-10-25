import { Injectable } from '@angular/core';
import { LoyaltyHttpService } from '@cl-core/http-services/loyalty-http.service';
import { ITableService } from '@cl-shared/table/data-source/table-service-interface';
import { Observable } from 'rxjs';
import { ClHttpParams } from '@cl-helpers/http-params';
import { map } from 'rxjs/operators';
import { LoyaltyHttpAdapter } from '@cl-core/http-adapters/loyalty-http-adapter';
import { ICustomTireForm } from '@cl-core/models/loyalty/loyalty-form.model';

@Injectable({
  providedIn: 'root'
})
export class LoyaltyCustomTierService implements ITableService {

  constructor(private loyaltyHttpService: LoyaltyHttpService) {
  }

  public getTableData(params: HttpParamsOptions): Observable<ITableData<ICustomTireForm>> {
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.loyaltyHttpService.getCustomTiers(httpParams).pipe(
      map(response => LoyaltyHttpAdapter.transformToTableDataCustomTierForm(response))
    );
  }

  public getCustomTier(id: string, params: HttpParamsOptions): Observable<ICustomTireForm> {
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.loyaltyHttpService.getCustomTier(id, httpParams).pipe(
      map((response: any) => LoyaltyHttpAdapter.transformToCustomTierForm(response.data))
    );
  }

  public createCustomTier(data: any, basicTierId: string): Observable<IResponseApi<any>> {
    const sendData: any = LoyaltyHttpAdapter.transformFromCustomTierForm(data, basicTierId);
    return this.loyaltyHttpService.createCustomTier({data: sendData});
  }

  public updateCustomTier(customTierId: string, data: any, basicTierId: string): Observable<IResponseApi<any>> {
    const sendData: any = LoyaltyHttpAdapter.transformFromCustomTierForm(data, basicTierId);
    sendData.id = customTierId;
    return this.loyaltyHttpService.updateCustomTier(customTierId, {data: sendData});
  }

  public deleteCustomTier(id: string): Observable<IResponseApi<any>> {
    return this.loyaltyHttpService.deleteCustomTier(id);
  }
}
