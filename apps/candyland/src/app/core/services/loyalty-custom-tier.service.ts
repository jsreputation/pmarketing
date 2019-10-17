import { Injectable } from '@angular/core';
import { LoyaltyHttpService } from '@cl-core/http-services/loyalty-http.service';
import { ITableService } from '@cl-shared/table/data-source/table-service-interface';
import { Observable } from 'rxjs';
import { ClHttpParams } from '@cl-helpers/http-params';
import { LoyaltyTierHttpAdapter } from '@cl-core/http-adapters/loyalty-tiers-http-adapter';
import { map } from 'rxjs/operators';

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
}
