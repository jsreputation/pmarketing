import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClHttpParams } from '@cl-helpers/http-params';
import { map, tap } from 'rxjs/operators';
import { ILoyaltyForm } from '@cl-core/models/loyalty/loyalty-form.model';
import { LoyaltyCardHttpService } from '@cl-core/http-services/loyalty-cards-http.service';
import { ITableService } from '@cl-shared/table';
import { JsonApiParser } from '@cl-helpers/json-api-parser';
import { LoyaltyCardHttpAdapter } from '@cl-core/http-adapters/loyalty-card-http-adapter';

@Injectable({
  providedIn: 'root'
})
export class LoyaltyCardService implements ITableService {

  constructor(private loyaltyCardHttpService: LoyaltyCardHttpService) {
  }

  public getLoyaltyCards(params: HttpParamsOptions): Observable<{ data: ILoyaltyForm[] }> {
    params.include = 'program';
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.loyaltyCardHttpService.getLoyaltyCards(httpParams).pipe(
      map(response =>
        JsonApiParser.parseDataWithIncludes(
          response,
          LoyaltyCardHttpAdapter.transformToLoyaltyCard,
          {
            programs: {fieldName: 'loyalty', adapterFunction: LoyaltyCardHttpAdapter.transformToIncludeLoyalty}
          })
      )
    );
  }

  public getTableData(params: HttpParamsOptions): Observable<ITableData<ILoyaltyForm>> {
    params.include = 'program';
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.loyaltyCardHttpService.getLoyaltyCards(httpParams).pipe(
      map(response =>
        JsonApiParser.parseDataWithIncludesAndMeta(
          response,
          LoyaltyCardHttpAdapter.transformToLoyaltyCard,
          {
            programs: {fieldName: 'loyalty', adapterFunction: LoyaltyCardHttpAdapter.transformToIncludeLoyalty}
          })
      ),
      tap(data => console.log(data))
    );
  }

  public getLoyaltyCard(id: string, params: HttpParamsOptions = {}): Observable<any> {
    params.include = 'program';
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.loyaltyCardHttpService.getLoyaltyCard(id, httpParams).pipe(
      map(response =>
        JsonApiParser.parseDataWithIncludes(
          response,
          LoyaltyCardHttpAdapter.transformToLoyaltyCard,
          {
            programs: {fieldName: 'loyalty', adapterFunction: LoyaltyCardHttpAdapter.transformToIncludeLoyalty}
          })
      )
    );
  }

  public createLoyaltyCard(data: any): Observable<any> {
    const sendData = LoyaltyCardHttpAdapter.transformFromCreateLoyaltyCard(data);
    return this.loyaltyCardHttpService.createLoyaltyCard({data: sendData});
    //   .pipe(
    //   map(response => LoyaltyCardHttpAdapter.transformFromLoyaltyCard(response.data))
    // );
  }

  public updateLoyaltyCard(id: string, data: any): Observable<any> {
    const sendData: any = LoyaltyCardHttpAdapter.transformFromLoyaltyCard(data);
    sendData.id = id;
    return this.loyaltyCardHttpService.updateLoyaltyCard(id, {data: sendData});
    //   .pipe(
    //   map(response => LoyaltyCardHttpAdapter.transformToLoyaltyForm(response.data))
    // );
  }

  public deleteLoyalty(id: string): Observable<any> {
    return this.loyaltyCardHttpService.deleteLoyaltyCard(id);
    //   .pipe(
    //   map(response => LoyaltyCardHttpAdapter.transformToLoyaltyForm(response.data))
    // );
  }
}
