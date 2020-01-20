import { Observable, of } from 'rxjs';
import { ILoyaltyForm } from '@cl-core/models/loyalty/loyalty-form.model';
import { IJsonApiItemPayload, IWBasicTierAttributes } from '@perx/whistler';

export class MockLoyaltyServices {

  public getMockLoyaltyForm(): ILoyaltyForm {
    return {
        id: '1', name: 'test'
      };
  }

  public getLoyalties(params: HttpParamsOptions): Observable<{ data: ILoyaltyForm[] }> {
    console.log(params);
    return of({
      data: [this.getMockLoyaltyForm()]
    });
  }

  public getTableData(params: HttpParamsOptions): Observable<ITableData<ILoyaltyForm>> {
    console.log(params);
    return of({
      data: [
        this.getMockLoyaltyForm()
      ],
      meta: {}
    });
  }
  public getLoyalty(id: string, params: HttpParamsOptions = {}): Observable<ILoyaltyForm> {
    console.log(id, params);
    return of(this.getMockLoyaltyForm());
  }

  public createLoyalty(data: ILoyaltyForm): Observable<ILoyaltyForm> {
    console.log(data);
    return of(this.getMockLoyaltyForm());
  }
  public updateLoyalty(id: string, data: ILoyaltyForm): Observable<ILoyaltyForm> {
    console.log(id, data);
    return of(this.getMockLoyaltyForm());
  }
  public updateLoyaltyStatus(id: string, status: string): Observable<ILoyaltyForm> {
    console.log(id, status);
    return of(this.getMockLoyaltyForm());
  }
  public deleteLoyalty(id: string): Observable<any> {
    return of(id);
  }
  public createBasicTier(data: ILoyaltyForm, loyaltyId: string): Observable<IJsonApiItemPayload<IWBasicTierAttributes>> {
    console.log(data, loyaltyId);
    return of(null);
  }

  public updateBasicTier(
    basicTierId: string,
    data: ILoyaltyForm,
    loyaltyId: string
  ): Observable<IJsonApiItemPayload<IWBasicTierAttributes>> {
    console.log(data, loyaltyId, basicTierId);
    return of(null);
  }

  public deleteBasicTier(id: string): Observable<void> {
    console.log(id);
    return of(null);
  }

  public duplicateLoyalty(loyalty: ILoyaltyForm): Observable<IJsonApiItemPayload<IWBasicTierAttributes>> {
    console.log(loyalty);
    return of(null);
  }

  public getLoyaltyRequest(loyalty: ILoyaltyForm, loyaltyId: string = null): Observable<ILoyaltyForm> {
    console.log(loyalty, loyaltyId);
    return of(null);
  }

  public getBasicTierRequest(
    loyalty: ILoyaltyForm,
    loyaltyId: string,
    basicTierId: string = null
  ): Observable<IJsonApiItemPayload<IWBasicTierAttributes>> {
    console.log(loyalty, loyaltyId, basicTierId);
    return of(null);
  }
}
