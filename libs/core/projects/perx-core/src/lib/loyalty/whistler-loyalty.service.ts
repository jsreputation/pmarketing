import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import {
  map,
  filter,
  retry,
  tap
} from 'rxjs/operators';
import { oc } from 'ts-optchain';

import {
  IWLoyalty,
  IWLoyaltyCard,
  IJsonApiListPayload,
  IJsonApiItem,
  IJsonApiItemPayload,
  IWBasicTierAttributes,
  IWCustomTierAttributes
} from '@perxtech/whistler';

import {
  ILoyalty,
  ILoyaltyTransaction,
  ITransactionHistory,
} from './models/loyalty.model';
import { LoyaltyService } from './loyalty.service';

import { Config } from '../config/config';

const DEFAULT_PAGE_COUNT: number = 10;

@Injectable({
  providedIn: 'root'
})
export class WhistlerLoyaltyService extends LoyaltyService {
  private hostName: string;

  // basic cache local to the service
  private loyalties: { [k: number]: ILoyalty } = {};

  constructor(
    private http: HttpClient,
    config: Config
  ) {
    super();
    this.hostName = config.apiHost as string;
  }

  // Each program may have multiple cards, here only take first one
  public static WLoyaltyToLoyalty(
    loyalty: IJsonApiItem<IWLoyaltyCard>,
    included?: IJsonApiItem<IWLoyalty | IWBasicTierAttributes | IWCustomTierAttributes>[]
  ): ILoyalty {
    const program: IJsonApiItem<IWLoyalty> | undefined = included ?
      included.find(item => item.type === 'programs') as IJsonApiItem<IWLoyalty> : undefined;

    const customTiers: IJsonApiItem<IWCustomTierAttributes> | undefined = included ?
      included.find(item => item.type === 'custom_tiers') as IJsonApiItem<IWCustomTierAttributes> : undefined;
    const membershipTierName: string | undefined = customTiers ? customTiers.attributes.name : undefined;

    return {
      id: Number.parseInt(loyalty.id, 10),
      name: oc(program).attributes.name(''),
      pointsBalance: Number.parseFloat(loyalty.attributes.balance),
      cardId: Number.parseInt(loyalty.id, 10),
      currency: oc(program).attributes.unit(),
      membershipTierName
    };
  }

  public getLoyalties(page: number = 1, pageSize: number = DEFAULT_PAGE_COUNT): Observable<ILoyalty[]> {
    return new Observable(subscriber => {
      if (Object.keys(this.loyalties).length > 0) {
        subscriber.next(Object.values(this.loyalties).slice(pageSize * (page - 1), pageSize * page));
      }

      const sub = this.http.get<IJsonApiListPayload<IWLoyaltyCard, IWLoyalty>>(
        `${this.hostName}/loyalty/cards`,
        {
          params: {
            'page[number]': page.toString(),
            'page[size]': pageSize.toString(),
            include: 'program,tier'
          }
        }
      ).pipe(
        map((loyalty: IJsonApiListPayload<IWLoyaltyCard, IWLoyalty>) =>
          loyalty.data.map(res => WhistlerLoyaltyService.WLoyaltyToLoyalty(res, loyalty.included))
        ),
        tap(loyalties => loyalties.forEach(l => this.loyalties[l.id] = l)),
        retry(1)
      ).subscribe((loyalties) => subscriber.next(loyalties));
      return () => sub.unsubscribe();
    });
  }

  // @ts-ignore
  public getLoyalty(id?: number, locale?: string): Observable<ILoyalty> {
    // if there is no id, query for the user's list of loyalties and return the first one
    if (!id) {
      return this.getLoyalties(1, 1)
        .pipe(
          filter((loyalties: ILoyalty[]) => loyalties.length > 0),
          map((loyalties: ILoyalty[]) => loyalties[0])
        );
    }

    return new Observable(subscriber => {
      if (this.loyalties[id]) {
        subscriber.next(this.loyalties[id]);
      }
      const sub = this.http.get<IJsonApiItemPayload<IWLoyaltyCard, IWLoyalty>>(
        `${this.hostName}/loyalty/cards/${id}?include=program,tier`
      ).pipe(
        map((res: IJsonApiItemPayload<IWLoyaltyCard, IWLoyalty>) => WhistlerLoyaltyService.WLoyaltyToLoyalty(res.data, res.included)),
        tap((l: ILoyalty) => this.loyalties[l.id] = l)
      ).subscribe((l: ILoyalty) => subscriber.next(l));
      return () => sub.unsubscribe();
    });

  }

  // @ts-ignore
  public getAllTransactions(loyaltyId?: number): Observable<ILoyaltyTransaction[]> {
    throw new Error('Not implemented.');
  }

  // @ts-ignore
  public getTransactions(loyaltyId: number, page: number = 1, pageSize: number = 10): Observable<ILoyaltyTransaction[]> {
    throw new Error('Not implemented.');
  }

  // @ts-ignore
  public getTransactionHistory(page: number = 1, pageSize: number = 10): Observable<ITransactionHistory[]> {
    throw new Error('Not implemented.');
  }
}
