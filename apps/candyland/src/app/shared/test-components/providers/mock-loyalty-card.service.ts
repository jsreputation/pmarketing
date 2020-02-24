import { Observable, of } from 'rxjs';
import { IAudiencesLoyaltyCard } from '@cl-core/models/audiences/audiences-loyalty.model';
import { IJsonApiItemPayload, IWLoyaltyCard } from '@perx/whistler';
import { HttpParamsOptions } from '@cl-core/models/params-map';
import { ITableData } from '@cl-core/models/data-list.interface';

export class MockLoyaltyCardService {

  public getMockAudiencesLoyaltyCard(id?: string): IAudiencesLoyaltyCard {
    return {
      id: id ? id : '1',
      userId: 5,
      balance: 5,
      loyalty: {
        id: '1',
        name: 'test',
        tiers: [{ id: 1, type: 'test', name: 'test' }]
      },
      tier: { id: 1, type: 'test', name: 'test' }
    };
  }

  public getLoyaltyCards(params: HttpParamsOptions): Observable<IAudiencesLoyaltyCard[]> {
    console.log(params);
    return of([this.getMockAudiencesLoyaltyCard()]);
  }

  public getTableData(params: HttpParamsOptions): Observable<ITableData<IAudiencesLoyaltyCard>> {
    console.log(params);
    return of({
      data: [this.getMockAudiencesLoyaltyCard()],
      meta: {}
    });
  }

  public getLoyaltyCard(id: string, params: HttpParamsOptions = {}): Observable<IAudiencesLoyaltyCard> {
    console.log(id, params);
    return of(this.getMockAudiencesLoyaltyCard());
  }

  public createLoyaltyCard(data: IAudiencesLoyaltyCard): Observable<IJsonApiItemPayload<IWLoyaltyCard>> {
    console.log(data);
    return of(null);
  }

  public updateLoyaltyCard(id: string, data: any): Observable<IJsonApiItemPayload<IWLoyaltyCard>> {
    console.log(id, data);
    return of(null);
  }

  public deleteLoyalty(id: string): Observable<void> {
    console.log(id);
    return of(null);
  }
}
