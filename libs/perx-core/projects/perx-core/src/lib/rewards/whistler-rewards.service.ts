import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RewardsService } from './rewards.service';
import { Observable, combineLatest, of } from 'rxjs';
import { IReward, ICatalog, IPrice, RedemptionType } from './models/reward.model';
import { Config } from '../config/config';
import { IJsonApiItemPayload, IJsonApiItem } from '../jsonapi.payload';
import { map, switchMap, catchError } from 'rxjs/operators';
import { IMerchant } from '../merchants/models/merchants.model';
import { IMerchantsService } from '../merchants/imerchants.service';
import { IRewardEntityAttributes } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class WhistlerRewardsService implements RewardsService {
  private baseUrl: string;

  constructor(private http: HttpClient, config: Config, private merchantService: IMerchantsService) {
    this.baseUrl = `${config.apiHost}/reward/entities/`;
  }

  private static WRedemptionToRT(rt: string): RedemptionType {
    if (rt === 'Promo Code') {
      return RedemptionType.txtCode;
    }
    if (rt === 'QR Code') {
      return RedemptionType.qr;
    }
    return RedemptionType.none;
  }

  private static WRewardToReward(r: IJsonApiItem<IRewardEntityAttributes>, merchant: IMerchant | null): IReward {
    return {
      // @ts-ignore
      id: (typeof r.id) === 'string' ? Number.parseInt(r.id, 10) : r.id,
      name: r.attributes.name,
      description: r.attributes.description,
      subtitle: '',
      validFrom: new Date(r.attributes.created_at),
      validTo: null,
      rewardThumbnail: r.attributes.image_url,
      rewardBanner: r.attributes.image_url,
      merchantId: Number.parseInt(r.attributes.organization_id, 10),
      merchantImg: merchant && merchant.images.length > 0 ? merchant.images[0].url : null,
      merchantName: merchant ? merchant.name : null,
      rewardPrice: [],
      termsAndConditions: r.attributes.terms_conditions,
      // howToRedeem: r.attributes.redemption_type,
      redemptionText: ('redemption_text' in r.attributes.display_properties) ? r.attributes.display_properties.redemption_text : null,
      categoryTags: [
        {
          id: 0,
          title: r.attributes.category
        }
      ],
      redemptionType: WhistlerRewardsService.WRedemptionToRT(r.attributes.redemption_type)
    };
  }

  public getTags(): void {
    throw new Error('Method not implemented.');
  }

  // @ts-ignore
  public getAllRewards(tags?: string[], categories?: string[]): Observable<IReward[]> {
    throw new Error('Method not implemented.');
  }

  // @ts-ignore
  public getRewards(page: number, pageSize: number, tags?: string[], categories?: string[]): Observable<IReward[]> {
    throw new Error('Method not implemented.');
  }

  // @ts-ignore
  public getReward(id: number, userId?: string): Observable<IReward> {
    return this.http.get<IJsonApiItemPayload<IRewardEntityAttributes>>(`${this.baseUrl}${id}`)
      .pipe(
        switchMap((reward: IJsonApiItemPayload<IRewardEntityAttributes>) => {
          if (reward.data.attributes.organization_id === null) {
            return of([reward, null]);
          }
          return combineLatest(
            of(reward),
            this.merchantService.getMerchant(Number.parseInt(reward.data.attributes.organization_id, 10))
              .pipe(catchError(() => of(null)))
          );
        }),
        map(([reward, merchant]: [IJsonApiItemPayload<IRewardEntityAttributes>, IMerchant | null]) =>
          WhistlerRewardsService.WRewardToReward(reward.data, merchant))
      );
  }

  // @ts-ignore
  public getRewardPricesOptions(id: number): Observable<IPrice[]> {
    throw new Error('Method not implemented.');
  }

  public getAllCatalogs(): Observable<ICatalog[]> {
    throw new Error('Method not implemented.');
  }

  // @ts-ignore
  public getCatalogs(page: number, pageSize: number): Observable<ICatalog[]> {
    throw new Error('Method not implemented.');
  }

  // @ts-ignore
  public getCatalog(id: number): Observable<ICatalog> {
    throw new Error('Method not implemented.');
  }
}
