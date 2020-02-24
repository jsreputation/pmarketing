import { Observable, of } from 'rxjs';
import { IAudiencesLoyaltyCard } from '@cl-core/models/audiences/audiences-loyalty.model';
import { IJsonApiItemPayload, IWLoyaltyCard } from '@perx/whistler';
import { ITableData } from '@cl-core/models/data-list.interface';
import { LoyaltyCardService } from '@cl-core/services/loyalty-card.service';

export class MockLoyaltyCardService implements Partial<LoyaltyCardService> {

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

  public getLoyaltyCards(): Observable<IAudiencesLoyaltyCard[]> {
    return of([this.getMockAudiencesLoyaltyCard()]);
  }

  public getTableData(): Observable<ITableData<IAudiencesLoyaltyCard>> {
    return of({
      data: [this.getMockAudiencesLoyaltyCard()],
      meta: {}
    });
  }

  public getLoyaltyCard(): Observable<IAudiencesLoyaltyCard> {
    return of(this.getMockAudiencesLoyaltyCard());
  }

  public createLoyaltyCard(): Observable<IJsonApiItemPayload<IWLoyaltyCard>> {
    return of(null);
  }

  public updateLoyaltyCard(): Observable<IJsonApiItemPayload<IWLoyaltyCard>> {
    return of(null);
  }

  public deleteLoyalty(): Observable<void> {
    return of(null);
  }
}
