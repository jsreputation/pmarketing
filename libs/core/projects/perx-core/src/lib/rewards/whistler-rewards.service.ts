import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RewardsService } from './rewards.service';
import { Observable, Subject, ReplaySubject, AsyncSubject } from 'rxjs';
import { IReward, ICatalog, IPrice } from './models/reward.model';
import { Config } from '../config/config';
import { map, tap, distinctUntilChanged, take } from 'rxjs/operators';

import {
  IWRewardEntityAttributes,
  IWMetaData,
  IJsonApiItemPayload,
  IJsonApiItem,
  IJsonApiListPayload,
  IWTierRewardCostsAttributes,
  IWMerchantAttributes,
  IWRelationshipsDataType,
  WRedemptionType
} from '@perxtech/whistler';
import { oc } from 'ts-optchain';
import { RedemptionType } from '../perx-core.models';
import { ITabConfigExtended } from './rewards-list-tabbed/rewards-list-tabbed.component';

@Injectable({
  providedIn: 'root'
})
export class WhistlerRewardsService implements RewardsService {
  private baseUrl: string;
  // basic local cache
  private rewards: { [k: number]: Subject<IReward> } = {};

  constructor(private http: HttpClient, private config: Config) {
    this.baseUrl = `${config.apiHost}/reward/entities`;
  }

  private static WRedemptionToRT(rt: WRedemptionType): RedemptionType {
    switch (rt) {
      case WRedemptionType.promoCode:
        return RedemptionType.txtCode;
      case WRedemptionType.qrCode:
        return RedemptionType.qr;
      case WRedemptionType.barCode:
        return RedemptionType.barcode;
      case WRedemptionType.merchantPin:
        return RedemptionType.pin;
      default:
        return RedemptionType.none;
    }
  }
  private static WRewardToReward(
    r: IJsonApiItem<IWRewardEntityAttributes>,
    merchants: IJsonApiItem<IWMerchantAttributes>[] | null,
    tierRewardCost: IJsonApiItem<IWTierRewardCostsAttributes>[] | null,
    metaData?: IWMetaData
  ): IReward {
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
      merchantId: merchants && merchants[0] ? Number.parseInt(merchants[0].id, 10) : undefined,
      merchantImg: oc(merchants)[0].attributes.properties.logo_image('') || undefined,
      merchantName: oc(merchants)[0].attributes.name('') || undefined,
      rewardPrice: [
        {
          price: `{r.attributes.cost_of_reward}`,
          currencyCode: r.attributes.currency,
          points: tierRewardCost && tierRewardCost[0] ? Number.parseInt(tierRewardCost[0].attributes.tier_value, 10) : undefined
        }
      ],
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
        res.forEach(r => {
          if (!this.rewards[r.id]) {
            this.rewards[r.id] = new AsyncSubject<IReward>();
          }
          this.rewards[r.id].next(r);
        });
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
      return this.getRewards(1, undefined, tags, categories).subscribe(process);
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
      'page[size]': pageSize.toString(),
      include: 'organization,tier_reward_costs'
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
      map(res => ({
        rewards: res.data,
        merchantsIC: res.included && res.included.length > 0 ?
          res.included.filter(include => include.type === 'Ros::Organization::Org') : null,
        tierRewardCostsIC: res.included && res.included.length > 0 ?
          res.included.filter(include => include.type === 'tier_reward_costs') : null
      })),
      map((res) => res.rewards.map(
        (r: IJsonApiItem<IWRewardEntityAttributes>) => {
          const merchants = res.merchantsIC && res.merchantsIC.length > 0 ? res.merchantsIC.filter(mIC => {
            const merchantRS = r.relationships && r.relationships.organization.data as IWRelationshipsDataType;
            return merchantRS && merchantRS.id === mIC.id && merchantRS.type === 'Ros::Organization::Org';
          }) : null;

          const tierRCosts = res.tierRewardCostsIC && res.tierRewardCostsIC.length > 0 ? res.tierRewardCostsIC.filter(cost =>
            oc(r).relationships.tier_reward_costs.data ?
              (oc(r).relationships.tier_reward_costs.data([]) as IWRelationshipsDataType[]).some(
                rewardCost => rewardCost.id === cost.attributes.entity_id.toString() && rewardCost.type === 'tier_reward_costs'
              ) : false
          ) || null : null;
          return WhistlerRewardsService.WRewardToReward(
            r,
            merchants,
            tierRCosts,
            metaData,
          );
        }
      )
      ),
      // save each reward in local cache
      tap((rewards: IReward[]) => {
        rewards.forEach(r => {
          if (!this.rewards[r.id]) {
            this.rewards[r.id] = new AsyncSubject<IReward>();
          }
          this.rewards[r.id].next(r);
        });
      })
    );
  }

  // @ts-ignore
  public getReward(id: number, userId?: string): Observable<IReward> {
    if (!this.rewards[id]) {
      this.rewards[id] = new ReplaySubject();

      const params = {
        include: 'organization,tier_reward_costs'
      };
      this.http.get<IJsonApiItemPayload<IWRewardEntityAttributes>>(`${this.baseUrl}/${id}`, { params })
        .pipe(
          map((reward: IJsonApiItemPayload<IWRewardEntityAttributes>) => {
            const tierRewardCosts = reward.included && reward.included.length > 0 ? reward.included.filter(include => include.type === 'tier_reward_costs') : null;
            const merchants = reward.included && reward.included.length > 0 ? reward.included.filter(include => include.type === 'Ros::Organization::Org') : null;
            return {
              reward: reward.data,
              merchants,
              tierRewardCosts
            };
          }),
          map(res => WhistlerRewardsService.WRewardToReward(res.reward, res.merchants, res.tierRewardCosts)),
          // save reward in local cache
          // tap((reward: IReward) => this.rewards[id] = reward)
        ).subscribe((reward: IReward) => { this.rewards[id].next(reward); });
    }

    return this.rewards[id].pipe(distinctUntilChanged(), take(1));
  }

  // @ts-ignore
  public getRewardPricesOptions(id: number): Observable<IPrice[]> {
    throw new Error('Method not implemented.');
  }

  public getAllCatalogs(): Observable<ICatalog[]> {
    throw new Error('Method not implemented.');
  }

  public getCategories(): Observable<ITabConfigExtended[]> {
    return this.http.get<ITabConfigExtended[]>(`${this.config.baseHref}assets/categories-tabs.json`);
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
