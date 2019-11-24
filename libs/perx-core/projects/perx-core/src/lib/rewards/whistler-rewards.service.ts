import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RewardsService } from './rewards.service';
import { Observable, combineLatest, of } from 'rxjs';
import { IReward, ICatalog, IPrice, RedemptionType } from './models/reward.model';
import { Config } from '../config/config';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { IMerchant } from '../merchants/models/merchants.model';
import { IMerchantsService } from '../merchants/imerchants.service';

import {
  IWRewardEntityAttributes,
  IWMetaData,
  IJsonApiItemPayload,
  IJsonApiItem,
  IJsonApiListPayload,
} from '@perx/whistler';
import { oc } from 'ts-optchain';

@Injectable({
  providedIn: 'root'
})
export class WhistlerRewardsService implements RewardsService {
  private baseUrl: string;
  // basic local cache
  private rewards: { [k: number]: IReward } = {};

  constructor(private http: HttpClient, config: Config, private merchantService: IMerchantsService) {
    this.baseUrl = `${config.apiHost}/reward/entities`;
  }

  private static WRedemptionToRT(rt: string): RedemptionType {
    if (rt === 'Promo Code') {
      return RedemptionType.txtCode;
    }
    if (rt === 'QR Code') {
      return RedemptionType.qr;
    }
    if (rt === 'Merchant PIN') {
      return RedemptionType.pin;
    }

    return RedemptionType.none;
  }

  private static WRewardToReward(r: IJsonApiItem<IWRewardEntityAttributes>, merchant: IMerchant | null, metaData?: IWMetaData): IReward {
    return {
      // @ts-ignore
      id: (typeof r.id) === 'string' ? Number.parseInt(r.id, 10) : r.id,
      name: r.attributes.name,
      description: oc(r).attributes.description(''),
      subtitle: '',
      validFrom: r.attributes.created_at ? new Date(r.attributes.created_at) : new Date(),
      validTo: null,
      rewardThumbnail: r.attributes.image_url,
      rewardBanner: oc(r).attributes.image_url(''),
      merchantId: r.attributes.organization_id ? Number.parseInt(r.attributes.organization_id, 10) : undefined,
      merchantImg: merchant && merchant.images && merchant.images.length > 0 ? merchant.images[0].url : undefined,
      merchantName: merchant ? merchant.name : undefined,
      rewardPrice: [],
      termsAndConditions: oc(r).attributes.terms_conditions(''),
      // howToRedeem: r.attributes.redemption_type,
      redemptionText: oc(r).attributes.display_properties.redemption_text(),
      categoryTags: [
        {
          id: 0,
          title: r.attributes.category
        }
      ],
      redemptionType: WhistlerRewardsService.WRedemptionToRT(r.attributes.redemption_type),
      rawPayload: metaData,
      displayProperties: {
        merchantPinText: oc(r).attributes.display_properties.merchantPinText(),
        rewardSuccessPopUp: oc(r).attributes.display_properties.rewardSuccessPopUp(),
        codeInstructionsText: oc(r).attributes.display_properties.codeInstructionsText(),
        errorPopUp: oc(r).attributes.display_properties.errorPopUp(),
      }
    };
  }

  public getAllRewards(tags?: string[] | null, categories?: string[]): Observable<IReward[]> {
    return new Observable(subject => {
      let current: IReward[] = [];
      let meta: IWMetaData = { currentPage: 1, totalPages: 1 };
      // we do not want to get all pages in parallel, so we get pages one after the other in order not to dos the server
      const process = (res: IReward[]) => {
        // save each reward in local cache
        res.forEach(r => this.rewards[r.id] = r);
        meta = res[0] && res[0].rawPayload || { ...meta };
        current = current.concat(res);
        subject.next(current);
        // if finished close the stream
        if (!meta.currentPage || !meta.totalPages || meta.currentPage >= meta.totalPages) {
          subject.complete();
        } else {
          // otherwise get next page
          this.getRewards(meta.currentPage + 1, undefined, tags, categories)
            .subscribe(process);
        }
      };
      // do the first query
      this.getRewards(1, undefined, tags, categories).subscribe(process);
    });
  }

  public getRewards(
    page: number,
    pageSize: number = 10,
    tags?: string[] | null,
    categories?: string[],
  ): Observable<IReward[]> {
    const tagsString = tags && tags.join(',');
    const categoriesString = categories && categories.join(',');
    let metaData: IWMetaData = {};
    const params = {
      'page[number]': page.toString(),
      'page[size]': pageSize.toString()
    };
    if (tagsString) {
      params['filter[tags]'] = tagsString;
    }
    if (categoriesString) {
      params['filter[category]'] = categoriesString;
    }

    return this.http.get<IJsonApiListPayload<IWRewardEntityAttributes>>(`${this.baseUrl}`,
      {
        params
      }
    ).pipe(
      tap((res: IJsonApiListPayload<IWRewardEntityAttributes>) => {
        metaData = {
          currentPage: page,
          totalPages: res.meta && res.meta.page_count
        };
      }),
      map(res => {
        const merchantIds: { [k: number]: boolean } = {};
        res.data.forEach((r) => !!r.attributes.organization_id && (merchantIds[r.attributes.organization_id] = true));
        return { rewards: res.data, mIds: Object.keys(merchantIds) };
      }),
      switchMap(
        (obj) => combineLatest(
          of(obj.rewards),
          obj.mIds.length > 0 ? combineLatest(...obj.mIds.map(id => this.merchantService.getMerchant(Number.parseInt(id, 10)))) : of([])
        )
      ),
      map(([rewards, merchants]: [IJsonApiItem<IWRewardEntityAttributes>[], IMerchant[]]) => rewards.map(
        (r: IJsonApiItem<IWRewardEntityAttributes>) => {
          let merchant: IMerchant | null = null;
          if (r.attributes.organization_id !== undefined) {
            const orgId: number = Number.parseInt(r.attributes.organization_id, 10);
            merchant = merchants.find(m => m.id === orgId) || null;
          }
          return WhistlerRewardsService.WRewardToReward(
            r,
            merchant,
            metaData
          );
        }
      )
      ),
      // save each reward in local cache
      tap((rewards: IReward[]) => rewards.forEach(r => this.rewards[r.id] = r))
    );
  }

  // @ts-ignore
  public getReward(id: number, userId?: string): Observable<IReward> {
    if (this.rewards[id]) {
      return of(this.rewards[id]);
    }

    return this.http.get<IJsonApiItemPayload<IWRewardEntityAttributes>>(`${this.baseUrl}/${id}`)
      .pipe(
        switchMap((reward: IJsonApiItemPayload<IWRewardEntityAttributes>) => {
          if (!reward.data.attributes.organization_id || reward.data.attributes.organization_id === null) {
            return of([reward, null]);
          }
          return combineLatest(
            of(reward),
            this.merchantService.getMerchant(Number.parseInt(reward.data.attributes.organization_id, 10))
              .pipe(catchError(() => of(null)))
          );
        }),
        map(([reward, merchant]: [IJsonApiItemPayload<IWRewardEntityAttributes>, IMerchant | null]) =>
          WhistlerRewardsService.WRewardToReward(reward.data, merchant)),
        // save reward in local cache
        tap((reward: IReward) => this.rewards[id] = reward)
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
