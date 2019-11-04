import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';

import {
  Observable,
} from 'rxjs';
import {
  map,
} from 'rxjs/operators';

import { RewardsService } from './rewards.service';
import {
  IReward,
  ICatalog,
  IPrice,
  ICategoryTags,
  RedemptionType,
  IDisplayProperties,
} from './models/reward.model';

import { Config } from '../config/config';

export interface IV4Tag {
  id: number;
  name: string;
}

interface IV4Image {
  type: string;
  url: string;
}

interface IV4RewardPrice {
  id: number;
  currency_code: string;
  price: number;
  points: number;
  identifier?: string;
}

interface IV4Inventory {
  reward_total_balance?: number | null;
  reward_total_limit?: number | null;
  reward_limit_per_user: number | null;
  reward_limit_per_user_balance: {
    available_amount: number;
    limit_error_klass: null;
    limit_type: string;
  };
}

export interface IV4Reward {
  id: number;
  name: string;
  description: string;
  subtitle: string;
  valid_from: Date;
  valid_to: Date;
  favourite: boolean;
  reward_price?: IV4RewardPrice[];
  images?: IV4Image[];
  merchant_id?: number;
  merchant_name?: string;
  merchant_website?: string;
  terms_and_conditions?: string;
  how_to_redeem?: string;
  redemption_type?: RedemptionType;
  tags?: IV4Tag[];
  category_tags?: ICategoryTags[];
  inventory?: IV4Inventory;
  selling_from?: string;
  merchant_logo_url?: string;
  display_properties?: IDisplayProperties;
}

interface IV4Price {
  id: number;
  reward_campaign_id: number;
  price?: number;
  currency_code?: string;
  points?: number;
  identifier?: string;
}

interface IV4GetRewardsResponse {
  data: IV4Reward[];
}

interface IV4GetRewardResponse {
  data: IV4Reward;
}

interface IV4GetRewardPricesResponse {
  data: IV4Price[];
}

interface IV4GetCatalogsResponse {
  data: IV4Catalog[];
}

interface IV4GetCatalogResponse {
  data: IV4Catalog;
}

interface IV4Catalog {
  id: number;
  name: string;
  description: string;
  terms_and_conditions: string;
  images?: IV4Image[];
  catalog_results: IV4CatalogResults;
  rewards: IV4Reward[];
}

interface IV4CatalogResults {
  count: number;
  first_result_id?: number;
}

@Injectable({
  providedIn: 'root'
})
export class V4RewardsService extends RewardsService {
  private apiHost: string;

  constructor(
    private http: HttpClient,
    config: Config
  ) {
    super();
    this.apiHost = config.apiHost as string;
  }

  public static v4RewardToReward(reward: IV4Reward): IReward {
    const images = reward.images || [];
    let thumbnail = images.find((image: IV4Image) => image.type === 'reward_thumbnail');
    if (thumbnail === undefined) {
      thumbnail = images.find((image: IV4Image) => image.type === 'reward_logo');
    }
    const thumbnailImg = thumbnail && thumbnail.url;
    const banner = images.find((image: IV4Image) => image.type === 'reward_banner');
    const rewardBanner = banner && banner.url;
    const merchantImg = reward.merchant_logo_url ? reward.merchant_logo_url : null;
    const sellingFrom = reward.selling_from ? new Date(reward.selling_from) : undefined;

    const v4Invent = reward.inventory;
    const inventory = {
      rewardTotalBalance: v4Invent.reward_total_balance !== undefined ? v4Invent.reward_total_balance : null,
      rewardTotalLimit: v4Invent.reward_total_limit !== undefined ? v4Invent.reward_total_limit : null,
      rewardLimitPerUserBalance: v4Invent.reward_limit_per_user_balance !== undefined && v4Invent.reward_limit_per_user_balance !== null ?
        v4Invent.reward_limit_per_user_balance.available_amount : null
    };
    return {
      id: reward.id,
      name: reward.name,
      subtitle: reward.subtitle,
      description: reward.description,
      rewardPrice: reward.reward_price.map(price => ({
        id: price.id,
        currencyCode: price.currency_code,
        price: price.price,
        points: price.points,
        identifier: price.identifier
      })),
      rewardThumbnail: thumbnailImg,
      rewardBanner,
      validFrom: new Date(reward.valid_from),
      validTo: new Date(reward.valid_to),
      sellingFrom,
      merchantId: reward.merchant_id,
      merchantName: reward.merchant_name,
      merchantImg,
      merchantWebsite: reward.merchant_website,
      termsAndConditions: reward.terms_and_conditions,
      howToRedeem: reward.how_to_redeem,
      categoryTags: reward.category_tags,
      inventory,
      displayProperties: reward.display_properties,
    };
  }

  private static v4CatalogToCatalog(catalog: IV4Catalog): ICatalog {
    const images = catalog.images || [];
    let thumbnail = images.find((image: IV4Image) => image.type === 'catalog_thumbnail');
    if (thumbnail === undefined) {
      thumbnail = images.find((image: IV4Image) => image.type === 'catalog_logo');
    }
    const thumbnailImg = thumbnail && thumbnail.url;
    const banner = images.find((image: IV4Image) => image.type === 'catalog_banner');
    const catalogBanner = banner && banner.url;
    const rewards = catalog.rewards && catalog.rewards.map((reward: IV4Reward) => V4RewardsService.v4RewardToReward(reward));
    return {
      id: catalog.id,
      name: catalog.name,
      description: catalog.description,
      catalogThumbnail: thumbnailImg,
      catalogBanner,
      rewardCount: catalog.catalog_results.count,
      rewards
    };
  }

  public static v4PriceToPrice(price: IV4Price): IPrice {
    return {
      id: price.id,
      rewardCampaignId: price.reward_campaign_id,
      price: price.price,
      currencyCode: price.currency_code,
      points: price.points,
      identifier: price.identifier
    };
  }

  public getAllRewards(tags?: string[], categories?: string[]): Observable<IReward[]> {
    return new Observable(subject => {
      const pageSize = 10;
      let current: IReward[] = [];
      let page: number = 1;
      // we do not want to get all pages in parallel, so we get pages one after the other in order not to dos the server
      const process = (res: IReward[]) => {
        current = current.concat(res);
        subject.next(current);
        // if finished close the stream
        if (res.length < pageSize) {
          subject.complete();
        } else {
          // otherwise get next page
          page ++;
          this.getRewards(page, undefined, tags, categories)
            .subscribe(process);
        }
      };
      // do the first query
      this.getRewards(1, undefined, tags, categories)
        .subscribe(process);
    });
  }

  public getRewards(page: number = 1, pageSize: number = 10, tags?: string[], categories?: string[]): Observable<IReward[]> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', pageSize.toString());
    if (tags) {
      params = params.set('tags', tags.join());
    }

    if (categories) {
      params = params.set('categories', categories.join());
    }

    return this.http.get<IV4GetRewardsResponse>(`${this.apiHost}/v4/rewards`, { params })
      .pipe(
        map((res: IV4GetRewardsResponse) => res.data),
        map((rewards: IV4Reward[]) => rewards.map(
          (reward: IV4Reward) => V4RewardsService.v4RewardToReward(reward)
        ))
      );
  }

  public getReward(id: number, userId: string = ''): Observable<IReward> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('user-id', userId);

    return this.http.get<IV4GetRewardResponse>(
      `${this.apiHost}/v4/rewards/${id}`, { headers }
    ).pipe(
      map(res => res.data),
      map((reward: IV4Reward) => V4RewardsService.v4RewardToReward(reward))
    );
  }

  public getAllCatalogs(): Observable<ICatalog[]> {
    return new Observable(subject => {
      const pageSize = 100;
      let current: ICatalog[] = [];
      let page: number = 1;
      const process = (res: ICatalog[]) => {
        current = current.concat(res);
        subject.next(current);
        // if finished close the stream
        if (res.length < pageSize) {
          subject.complete();
        } else {
          // otherwise get next page
          page ++;
          this.getCatalogs(page + 1, pageSize)
            .subscribe(process);
        }
      };
      // do the first query
      this.getCatalogs(1, pageSize)
        .subscribe(process);
    });
  }

  private getCatalogs(page: number = 1, pageSize: number = 10): Observable<ICatalog[]> {
    return this.http.get<IV4GetCatalogsResponse>(
      `${this.apiHost}/v4/catalogs`,
      {
        params: {
          page: `${page}`,
          size: `${pageSize}`
        }
      }
    ).pipe(
      map((res: IV4GetCatalogsResponse) => res.data),
      map((catalogs: IV4Catalog[]) => catalogs.map(
        (catalog: IV4Catalog) => V4RewardsService.v4CatalogToCatalog(catalog)
      ))
    );
  }

  public getCatalog(id: number): Observable<ICatalog> {
    return this.http.get<IV4GetCatalogResponse>(
      `${this.apiHost}/v4/catalogs/${id}`
    ).pipe(
      map(res => res.data),
      map((catalog: IV4Catalog) => V4RewardsService.v4CatalogToCatalog(catalog))
    );
  }

  public getRewardPricesOptions(id: number): Observable<IPrice[]> {
    return this.http.get<IV4GetRewardPricesResponse>(
      `${this.apiHost}/v4/rewards/${id}/prices`
    ).pipe(
      map(res => res.data),
      map((prices: IV4Price[]) => prices.map(
        (price: IV4Price) => V4RewardsService.v4PriceToPrice(price)
      ))
    );
  }
}
