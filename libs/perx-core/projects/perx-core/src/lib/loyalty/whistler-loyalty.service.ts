import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILoyalty, ITransaction, ITransactionHistory } from './models/loyalty.model';
import { Observable } from 'rxjs';
import { Config } from '../config/config';
import { map } from 'rxjs/operators';
import { oc } from 'ts-optchain';

import {
  IWLoyalty,
  IWLoyaltyCard,
  IJsonApiListPayload,
  IJsonApiItem,
  IJsonApiItemPayload,
  IWRelationshipsDataType
} from '@perx/whistler';
import { AuthenticationService } from '../auth/authentication/authentication.service';

const DEFAULT_PAGE_COUNT: number = 10;

@Injectable({
  providedIn: 'root'
})
export class WhistlerLoyaltyService {
  private hostName: string;

  constructor(
    private http: HttpClient,
    config: Config,
    private authService: AuthenticationService
  ) {
    this.hostName = config.apiHost as string;
  }
  // Each program may have multiple cards, here only take first one
  public static WLoyaltyToLoyalty(
    loyalty: IJsonApiItem<IWLoyalty>,
    userId: number,
    cards?: IJsonApiItem<IWLoyaltyCard>[]
  ): ILoyalty {
    const card = cards && cards.find(cardTemp =>
      cardTemp.type === 'cards' && cardTemp.attributes.user_id === userId &&
      (oc(loyalty).relationships.cards.data([]) as IWRelationshipsDataType[])
        .filter(rCard => rCard.type === 'cards' && rCard.id === cardTemp.id).length > 0
    );
    return {
      id: Number.parseInt(loyalty.id, 10),
      name: loyalty.attributes.name,
      pointsBalance: card && card.attributes.balance || 0,
      cardId: card && Number.parseInt(card.id, 10)
    };
  }
  // Here has multiple programs found, will only take the first one in app. Will find the mapping logic later to have multiple programs
  public getLoyalties(page: number = 1, pageSize: number = DEFAULT_PAGE_COUNT): Observable<ILoyalty[]> {
    const userId = this.authService.getUserId() || 0;
    return this.http.get<IJsonApiListPayload<IWLoyalty, IWLoyaltyCard>>(
      `${this.hostName}/loyalty/programs`,
      {
        params: {
          'page[number]': page.toString(),
          'page[size]': pageSize.toString(),
          include: 'cards'
        }
      }
    ).pipe(
      map((loyalty: IJsonApiListPayload<IWLoyalty, IWLoyaltyCard>) =>
        loyalty.data.map(
          res => WhistlerLoyaltyService.WLoyaltyToLoyalty(res, userId, loyalty.included)
        )
      )
    );
  }

  public getLoyalty(id?: number): Observable<ILoyalty> {
    const userId = this.authService.getUserId() || 0;
    return this.http.get<IJsonApiItemPayload<IWLoyalty, IWLoyaltyCard>>(
      `${this.hostName}/loyalty/programs/${id}?include=cards`
    ).pipe(
      map((res: IJsonApiItemPayload<IWLoyalty>) => WhistlerLoyaltyService.WLoyaltyToLoyalty(res.data, userId, res.included))
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
