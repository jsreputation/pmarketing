import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClHttpParams } from '@cl-helpers/http-params';
import { map } from 'rxjs/operators';
import { LoyaltyCardHttpService } from '@cl-core/http-services/loyalty-cards-http.service';
import { ITableService } from '@cl-shared/table';
import { JsonApiParser } from '@cl-helpers/json-api-parser';
import { LoyaltyCardHttpAdapter } from '@cl-core/http-adapters/loyalty-card-http-adapter';
import { IAudiencesLoyaltyCard } from '@cl-core/models/audiences/audiences-loyalty.model';
import { IJsonApiItemPayload, IWLoyaltyCard } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class LoyaltyCardService implements ITableService {

  constructor(private loyaltyCardHttpService: LoyaltyCardHttpService) {
  }

  public getLoyaltyCards(params: HttpParamsOptions): Observable<IAudiencesLoyaltyCard[]> {
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

  public getTableData(params: HttpParamsOptions): Observable<ITableData<IAudiencesLoyaltyCard>> {
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
      )
    );
  }

  public getLoyaltyCard(id: string, params: HttpParamsOptions = {}): Observable<IAudiencesLoyaltyCard> {
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

  public createLoyaltyCard(data: IAudiencesLoyaltyCard): Observable<IJsonApiItemPayload<IWLoyaltyCard>> {
    const sendData = LoyaltyCardHttpAdapter.transformFromCreateLoyaltyCard(data);
    return this.loyaltyCardHttpService.createLoyaltyCard({data: sendData});
  }

  public updateLoyaltyCard(id: string, data: any): Observable<IJsonApiItemPayload<IWLoyaltyCard>> {
    const sendData: any = LoyaltyCardHttpAdapter.transformFromUpdateLoyaltyCard(data);
    console.log('sendData', sendData);
    return this.loyaltyCardHttpService.updateLoyaltyCard(id, {data: sendData});
  }

  public deleteLoyalty(id: string): Observable<void> {
    return this.loyaltyCardHttpService.deleteLoyaltyCard(id);
  }
}
