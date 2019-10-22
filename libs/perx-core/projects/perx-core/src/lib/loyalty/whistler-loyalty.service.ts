import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILoyalty, ITransaction, ITransactionHistory } from './models/loyalty.model';
import { Observable } from 'rxjs';
import { Config } from '../config/config';
import { map } from 'rxjs/operators';
import { IJsonApiListPayload, IJsonApiItem, IJsonApiItemPayload } from '../jsonapi.payload';
import { ILoyalty as IWLoyalty, ILoyaltyCard} from '@perx/whistler';

const DEFAULT_PAGE_COUNT: number = 10;

@Injectable({
  providedIn: 'root'
})
export class WhistlerLoyaltyService {
  private hostName: string;

  constructor(
    private http: HttpClient,
    config: Config
  ) {
    this.hostName = config.apiHost as string;
  }

  public static WLoyaltyToLoyalty(loyalty: IJsonApiItem<IWLoyalty>, cards: IJsonApiItem<ILoyaltyCard>[]): ILoyalty {
    const card = cards && cards.find(cardTemp =>
      cardTemp.type === 'cards' &&
      loyalty.relationships.cards.data.filter(rCard => rCard.type === 'cards' && rCard.id === cardTemp.id).length > 0
    );
    return {
      id: Number.parseInt(loyalty.id, 10),
      name: loyalty.attributes.name,
      pointsBalance: card && card.attributes.balance || 0
    };
  }

  public getLoyalties(page: number = 1, pageSize: number = DEFAULT_PAGE_COUNT): Observable<ILoyalty[]> {
    return this.http.get<IJsonApiListPayload<IWLoyalty, ILoyaltyCard>>(
      `${this.hostName}/loyalty/programs`,
      {
        params: {
          'page[number]': page.toString(),
          'page[size]': pageSize.toString(),
          include: 'cards'
        }
      }
    ).pipe(
      map((loyalty: IJsonApiListPayload<IWLoyalty, ILoyaltyCard>) =>
        loyalty.data.map(
          res => WhistlerLoyaltyService.WLoyaltyToLoyalty(res, loyalty.included)
        )
      )
    );
  }

  public getLoyalty(id?: number): Observable<ILoyalty> {
    return this.http.get<IJsonApiItemPayload<IWLoyalty, ILoyaltyCard>>(
      `${this.hostName}/loyalty/programs/${id}?include=cards`
    ).pipe(
      map((res: IJsonApiItemPayload<IWLoyalty>) => WhistlerLoyaltyService.WLoyaltyToLoyalty(res.data, res.included))
    );
  }

  // @ts-ignore
  public getAllTransactions(loyaltyId?: number): Observable<ITransaction[]> {
    throw new Error('Not implemented.');
  }

  // @ts-ignore
  public getTransactions(loyaltyId: number, page: number = 1, pageSize: number = 10): Observable<ITransaction[]> {
    throw new Error('Not implemented.');
  }

  // @ts-ignore
  public getTransactionHistory(page: number = 1, pageSize: number = 10): Observable<ITransactionHistory[]> {
    throw new Error('Not implemented.');
  }
}
