import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILoyalty } from './models/loyalty.model';
import { Observable } from 'rxjs';
import { Config } from '../config/config';
import { map } from 'rxjs/operators';
import { IJsonApiListPayload, IJsonApiItem, IJsonApiItemPayload } from '../jsonapi.payload';
const DEFAULT_PAGE_COUNT: number = 10;

interface IWLoyalty {
  name: string;
  unit: string;
  status: string;
  custom_tiers_count: number;
}

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

  public static WLoyaltyToLoyalty(loyalty: IJsonApiItem<IWLoyalty>): ILoyalty {
    return {
      id: Number.parseInt(loyalty.id, 10),
      name: loyalty.attributes.name,
    };
  }

  public getLoyalties(page: number = 1, pageSize: number = DEFAULT_PAGE_COUNT): Observable<ILoyalty[]> {
    return this.http.get<IJsonApiListPayload<IWLoyalty>>(
      `${this.hostName}/loyalty/programs`,
      {
        params: {
          page_number: `${page}`,
          page_size: `${pageSize}`
        }
      }
    ).pipe(
      map((res: IJsonApiListPayload<IWLoyalty>) => res.data),
      map((Loyalty: IJsonApiItem<IWLoyalty>[]) => Loyalty.map(
        res => WhistlerLoyaltyService.WLoyaltyToLoyalty(res)
      ))
    );
  }

  public getLoyalty(id?: number): Observable<ILoyalty> {
    return this.http.get<IJsonApiItemPayload<IWLoyalty>>(
      `${this.hostName}/loyalty/programs/${id}`
    ).pipe(
      map((res: IJsonApiItemPayload<IWLoyalty>) => WhistlerLoyaltyService.WLoyaltyToLoyalty(res.data))
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
