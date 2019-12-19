import { Injectable } from '@angular/core';
import { LoyaltyHttpService } from '@cl-core/http-services/loyalty-http.service';
import { ITableService } from '@cl-shared/table/data-source/table-service-interface';
import { Observable } from 'rxjs';
import { ClHttpParams } from '@cl-helpers/http-params';
import { LoyaltyHttpAdapter } from '@cl-core/http-adapters/loyalty-http-adapter';
import { map, switchMap } from 'rxjs/operators';
import { IWBasicTierAttributes } from '@perx/whistler';
import { ILoyaltyForm } from '@cl-core/models/loyalty/loyalty-form.model';

@Injectable({
  providedIn: 'root'
})
export class LoyaltyService implements ITableService {

  constructor(private loyaltyHttpService: LoyaltyHttpService) {
  }

  public getLoyalties(params: HttpParamsOptions): Observable<{ data: ILoyaltyForm[] }> {
    params.include = 'pool,basic_tier,custom_tiers';
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.loyaltyHttpService.getLoyalties(httpParams).pipe(
      map(response => LoyaltyHttpAdapter.transformToLoyalties(response))
    );
  }

  public getTableData(params: HttpParamsOptions): Observable<ITableData<ILoyaltyForm>> {
    params.include = 'pool,basic_tier';
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.loyaltyHttpService.getLoyalties(httpParams).pipe(
      map(response => LoyaltyHttpAdapter.transformToTableData(response))
    );
  }

  public getLoyalty(id: string, params: HttpParamsOptions = {}): Observable<ILoyaltyForm> {
    params.include = 'pool,basic_tier';
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.loyaltyHttpService.getLoyalty(id, httpParams).pipe(
      map(response => {
        let formLoyalty = LoyaltyHttpAdapter.transformToLoyaltyForm(response.data);
        formLoyalty = LoyaltyHttpAdapter.setIncludedToLoyaltyForm(response, response.data, formLoyalty);
        return formLoyalty;
      })
    );
  }

  public createLoyalty(data: ILoyaltyForm): Observable<ILoyaltyForm> {
    const sendData = LoyaltyHttpAdapter.transformFromLoyaltyForm(data);
    return this.loyaltyHttpService.createLoyalty({data: sendData}).pipe(
      map(response => LoyaltyHttpAdapter.transformToLoyaltyForm(response.data))
    );
  }

  public updateLoyalty(id: string, data: ILoyaltyForm): Observable<ILoyaltyForm> {
    const sendData: any = LoyaltyHttpAdapter.transformFromLoyaltyForm(data);
    sendData.id = id;
    return this.loyaltyHttpService.updateLoyalty(id, {data: sendData}).pipe(
      map(response => LoyaltyHttpAdapter.transformToLoyaltyForm(response.data))
    );
  }

  public updateLoyaltyStatus(id: string, status: string): Observable<ILoyaltyForm> {
    const sendData: any = LoyaltyHttpAdapter.transformLoyaltyStatus(status);
    sendData.id = id;
    return this.loyaltyHttpService.updateLoyalty(id, {data: sendData}).pipe(
      map(response => LoyaltyHttpAdapter.transformToLoyaltyForm(response.data))
    );
  }

  public deleteLoyalty(id: string): Observable<any> {
    return this.loyaltyHttpService.deleteLoyalty(id);
    //   .pipe(
    //   map(response => LoyaltyHttpAdapter.transformToLoyaltyForm(response.data))
    // );
  }

  public createBasicTier(data: ILoyaltyForm, loyaltyId: string): Observable<IJsonApiPayload<IWBasicTierAttributes>> {
    const sendData: any = LoyaltyHttpAdapter.transformFromBasicTierForm(data, loyaltyId);
    return this.loyaltyHttpService.createBasicTier({data: sendData});
  }

  public updateBasicTier(basicTierId: string, data: ILoyaltyForm, loyaltyId: string): Observable<IJsonApiPayload<IWBasicTierAttributes>> {
    const sendData: any = LoyaltyHttpAdapter.transformFromBasicTierForm(data, loyaltyId);
    sendData.id = basicTierId;
    return this.loyaltyHttpService.updateBasicTier(basicTierId, {data: sendData});
  }

  public deleteBasicTier(id: string): Observable<IJsonApiPayload<IWBasicTierAttributes>> {
    return this.loyaltyHttpService.deleteBasicTier(id);
  }

  public duplicateLoyalty(loyalty: ILoyaltyForm): Observable<IJsonApiPayload<IWBasicTierAttributes>> {
    return this.createLoyalty(loyalty)
      .pipe(
        map(newLoyalty => newLoyalty.id),
        switchMap((newLoyaltyId) => this.createBasicTier(loyalty, newLoyaltyId))
      );
  }

  public getLoyaltyRequest(loyalty: ILoyaltyForm, loyaltyId: string = null): Observable<ILoyaltyForm> {
    if (loyaltyId) {
      return this.updateLoyalty(loyaltyId, loyalty);
    }
    return this.createLoyalty(loyalty);
  }

  public getBasicTierRequest(
    loyalty: ILoyaltyForm,
    loyaltyId: string,
    basicTierId: string = null
  ): Observable<IJsonApiPayload<IWBasicTierAttributes>> {
    if (basicTierId) {
      return this.updateBasicTier(basicTierId, loyalty, loyaltyId);
    }
    return this.createBasicTier(loyalty, loyaltyId);
  }

}
