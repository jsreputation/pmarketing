import { Injectable } from '@angular/core';
import { LoyaltyHttpService } from '@cl-core/http-services/loyalty-http.service';
import { ITableService } from '@cl-shared/table/data-source/table-service-interface';
import { Observable } from 'rxjs';
import { ClHttpParams } from '@cl-helpers/http-params';

@Injectable({
  providedIn: 'root'
})
export class LoyaltyService implements ITableService {

  constructor(private loyaltyHttpService: LoyaltyHttpService) {
  }

  public getTableData(params: HttpParamsOptions): Observable<ITableData<any>> {
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.loyaltyHttpService.getLoyalties(httpParams).pipe(
      // map(response => RewardHttpAdapter.transformToTableData(response))
    );
  }
}
