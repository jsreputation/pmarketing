import { Injectable } from '@angular/core';
import { LoyaltyHttpService } from '@cl-core/http-services/loyalty-http.service';
import { ITableService } from '@cl-shared/table/data-source/table-service-interface';
import { Observable } from 'rxjs';
import { ClHttpParams } from '@cl-helpers/http-params';
import { LoyaltyTierHttpAdapter } from '@cl-core/http-adapters/loyalty-tiers-http-adapter';
import { map } from 'rxjs/operators';
import { LoyaltyHttpAdapter } from '@cl-core/http-adapters/loyalty-http-adapter';

@Injectable({
  providedIn: 'root'
})
export class LoyaltyCustomTierService implements ITableService {

  constructor(private loyaltyHttpService: LoyaltyHttpService) {
  }

  public getTableData(params: HttpParamsOptions): Observable<ITableData<any>> {
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.loyaltyHttpService.getLoyaltyCustomTiers(httpParams).pipe(
      map(response => LoyaltyTierHttpAdapter.transformToTableData(response))
    );
  }

  public createLoyaltyCustomTier(data: any, loyaltyBasicTierId: string): Observable<IResponseApi<any>> {
    const sendData: any = LoyaltyHttpAdapter.transformFromLoyaltyCustomTierForm(data, loyaltyBasicTierId);
    return this.loyaltyHttpService.createLoyaltyCustomTier({data: sendData});
  }

  public updateLoyaltyCustomTier(loyaltyCustomTierId: string, data: any, loyaltyBasicTierId: string): Observable<IResponseApi<any>> {
    const sendData: any = LoyaltyHttpAdapter.transformFromLoyaltyCustomTierForm(data, loyaltyBasicTierId);
    sendData.id = loyaltyCustomTierId;
    return this.loyaltyHttpService.updateLoyaltyCustomTier(loyaltyCustomTierId, {data: sendData});
  }

  public deleteLoyaltyCustomTier(id: string): Observable<IResponseApi<any>> {
    return this.loyaltyHttpService.deleteLoyaltyCustomTier(id);
  }
}
