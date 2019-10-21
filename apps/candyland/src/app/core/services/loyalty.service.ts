import { Injectable } from '@angular/core';
import { LoyaltyHttpService } from '@cl-core/http-services/loyalty-http.service';
import { ITableService } from '@cl-shared/table/data-source/table-service-interface';
import { Observable } from 'rxjs';
import { ClHttpParams } from '@cl-helpers/http-params';
import { LoyaltyHttpAdapter } from '@cl-core/http-adapters/loyalty-http-adapter';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoyaltyService implements ITableService {

  constructor(private loyaltyHttpService: LoyaltyHttpService) {
  }

  public getTableData(params: HttpParamsOptions): Observable<ITableData<any>> {
    params.include = 'pool,basic_tier';
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.loyaltyHttpService.getLoyalties(httpParams).pipe(
      map(response => {
        return LoyaltyHttpAdapter.transformToTableData(response);
      })
    );
  }

  public createLoyalty(data: any): Observable<IResponseApi<any>> {
    const sendData: any = LoyaltyHttpAdapter.transformFromLoyaltyForm(data);
    return this.loyaltyHttpService.createLoyalty({data: sendData});
  }

  public updateLoyalty(id: string, data: any): Observable<IResponseApi<any>> {
    const sendData: any = LoyaltyHttpAdapter.transformFromLoyaltyForm(data);
    sendData.id = id;
    return this.loyaltyHttpService.updateLoyalty(id, {data: sendData});
  }

  public updateLoyaltyStatus(id: string, status: string): Observable<IResponseApi<any>> {
    const sendData: any = LoyaltyHttpAdapter.transformLoyaltyStatus(status);
    sendData.id = id;
    return this.loyaltyHttpService.updateLoyalty(id, {data: sendData});
  }

  public deleteLoyalty(id: string): Observable<IResponseApi<any>> {
    return this.loyaltyHttpService.deleteLoyalty(id);
  }

  public createBasicTier(data: any, loyaltyId: string): Observable<IResponseApi<any>> {
    const sendData: any = LoyaltyHttpAdapter.transformFromBasicTierForm(data, loyaltyId);
    return this.loyaltyHttpService.createBasicTier({data: sendData});
  }

  public updateBasicTier(basicTierId: string, data: any, loyaltyId: string): Observable<IResponseApi<any>> {
    const sendData: any = LoyaltyHttpAdapter.transformFromBasicTierForm(data, loyaltyId);
    sendData.id = basicTierId;
    return this.loyaltyHttpService.updateBasicTier(basicTierId, {data: sendData});
  }

  public deleteBasicTier(id: string): Observable<IResponseApi<any>> {
    return this.loyaltyHttpService.deleteBasicTier(id);
  }

  public duplicateLoyalty(loyalty: ILoyaltyForm): Observable<any> {
    return this.createLoyalty(loyalty)
      .pipe(
        map(newLoyalty => newLoyalty.data.id),
        switchMap((newLoyaltyId) => this.createLoyaltyBasicTier(loyalty, newLoyaltyId))
      );
  }
}
