import { Observable, of } from 'rxjs';
import { ILoyaltyForm } from '@cl-core/models/loyalty/loyalty-form.model';
import { IJsonApiItemPayload, IWBasicTierAttributes } from '@perx/whistler';
import { IAudiencesLoyalty } from '@cl-core/models/audiences/audiences-loyalty.model';
import { ITableData } from '@cl-core/models/data-list.interface';
import { LoyaltyService } from '@cl-core/services/loyalty.service';
export class MockLoyaltyServices implements Partial<LoyaltyService> {

  public getMockLoyaltyForm(): ILoyaltyForm {
    return {
      id: '1', name: 'test'
    };
  }

  public getAudiencesLoyaltyOption(): Observable<IAudiencesLoyalty[]> {
    return of([(this.getMockLoyaltyForm() as any)]);
  }

  public getLoyalties(): Observable<{ data: ILoyaltyForm[] }> {
    return of({
      data: [this.getMockLoyaltyForm()]
    });
  }

  public getTableData(): Observable<ITableData<ILoyaltyForm>> {
    return of({
      data: [
        this.getMockLoyaltyForm()
      ],
      meta: {}
    });
  }
  public getLoyalty(): Observable<ILoyaltyForm> {
    return of(this.getMockLoyaltyForm());
  }

  public createLoyalty(): Observable<ILoyaltyForm> {
    return of(this.getMockLoyaltyForm());
  }
  public updateLoyalty(): Observable<ILoyaltyForm> {
    return of(this.getMockLoyaltyForm());
  }
  public updateLoyaltyStatus(): Observable<ILoyaltyForm> {
    return of(this.getMockLoyaltyForm());
  }
  public deleteLoyalty(id: string): Observable<any> {
    return of(id);
  }
  public createBasicTier(): Observable<IJsonApiItemPayload<IWBasicTierAttributes>> {
    return of(null);
  }

  public updateBasicTier(): Observable<IJsonApiItemPayload<IWBasicTierAttributes>> {
    return of(null);
  }

  public deleteBasicTier(): Observable<void> {
    return of(null);
  }

  public duplicateLoyalty(): Observable<IJsonApiItemPayload<IWBasicTierAttributes>> {
    return of(null);
  }

  public getLoyaltyRequest(): Observable<ILoyaltyForm> {
    return of(null);
  }

  public getBasicTierRequest(): Observable<IJsonApiItemPayload<IWBasicTierAttributes>> {
    return of(null);
  }
}
