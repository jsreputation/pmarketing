import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { formatNumber } from '@angular/common';
import {
  Observable,
} from 'rxjs';
import {
  map
} from 'rxjs/operators';
import { oc } from 'ts-optchain';

import { IWRewardDisplayProperties } from '@perxtech/whistler';

import { RewardsService } from './rewards.service';
import {
  IReward,
  ICatalog,
  IPrice,
  ICategoryTags,
} from './models/reward.model';

import { RewardStateHelper } from './reward-state-helper';
import { ITabConfigExtended } from './rewards-list-tabbed/rewards-list-tabbed.component';
import { ConfigService } from '../config/config.service';
import { IConfig } from '../config/models/config.model';

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
  } | null;
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
  steps_to_redeem?: string;
  tags?: IV4Tag[];
  category_tags?: ICategoryTags[];
  inventory?: IV4Inventory;
  selling_from?: string;
  selling_to?: string;
  merchant_logo_url?: string;
  display_properties?: IWRewardDisplayProperties;
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

interface IV4GetCategoriesResponse {
  data: IV4Category[];
}

interface IV4Category {
  id: number;
  description: string;
  title: string;
  usage: string[];
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
    private configService: ConfigService
  ) {
    super();
    this.configService.readAppConfig().subscribe(
      (config: IConfig<void>) => {
        this.apiHost = config.apiHost as string;
      });
  }


  public static v4RewardToReward(reward: IV4Reward): IReward {
    const images = reward.images || [];
    let thumbnail = images.find((image: IV4Image) => image.type === 'reward_thumbnail');
    if (thumbnail === undefined) {
      thumbnail = images.find((image: IV4Image) => image.type === 'reward_logo');
    }
    const thumbnailImg = thumbnail && thumbnail.url;
    const banner = images.find((image: IV4Image) => image.type === 'reward_banner');
    const rewardBanner: string = oc(banner).url('');
    const merchantImg = oc(reward).merchant_logo_url();
    const sellingFrom = reward.selling_from ? new Date(reward.selling_from) : undefined;
    const sellingTo = reward.selling_to ? new Date(reward.selling_to) : undefined;

    const v4Invent = reward.inventory;
    const inventory = v4Invent ? {
      rewardTotalBalance: v4Invent.reward_total_balance !== undefined ? v4Invent.reward_total_balance : null,
      rewardTotalLimit: v4Invent.reward_total_limit !== undefined ? v4Invent.reward_total_limit : null,
      rewardLimitPerUserBalance: v4Invent.reward_limit_per_user_balance !== undefined && v4Invent.reward_limit_per_user_balance !== null ?
        v4Invent.reward_limit_per_user_balance.available_amount : null
    } : undefined;
    return {
      id: reward.id,
      name: reward.name,
      subtitle: reward.subtitle,
      description: reward.description,
      rewardPrice: reward.reward_price ? reward.reward_price.map(price => ({
        id: price.id,
        currencyCode: price.currency_code,
        price: Number(price.price || 0).toFixed(2),
        points: price.points,
        identifier: price.identifier
      })) : undefined,
      rewardThumbnail: thumbnailImg,
      rewardState: RewardStateHelper.getRewardState(reward as unknown as IReward),
      rewardBanner,
      validFrom: new Date(reward.valid_from),
      validTo: new Date(reward.valid_to),
      sellingFrom,
      sellingTo,
      merchantId: reward.merchant_id,
      merchantName: reward.merchant_name,
      merchantImg,
      merchantWebsite: reward.merchant_website,
      termsAndConditions: oc(reward).terms_and_conditions(''),
      howToRedeem: oc(reward).steps_to_redeem(''),
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
    const thumbnailImg = oc(thumbnail).url('');
    const banner = images.find((image: IV4Image) => image.type === 'catalog_banner');
    const catalogBanner = oc(banner).url('');
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

  private static v4CategoriesToCategories(category: IV4Category): ITabConfigExtended {
    return {
      tabName: category.title,
      rewardsType: category.title,
      currentPage: 1,
      completePagination: false,
      filterKey: null,
      filterValue: null,
    };
  }

  public static v4PriceToPrice(price: IV4Price): IPrice {
    return {
      id: price.id,
      rewardCampaignId: price.reward_campaign_id,
      price: formatNumber(price.price || 0, 'en-us', '1.2'),
      currencyCode: price.currency_code,
      points: price.points,
      identifier: price.identifier
    };
  }

  public getAllRewards(tags?: string[] | null, categories?: string[], locale: string = 'en'): Observable<IReward[]> {
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
          page++;
          this.getRewards(page, undefined, tags, categories, locale)
            .subscribe(process);
        }
      };
      // do the first query
      return this.getRewards(1, undefined, tags, categories, locale).subscribe(process);
    });
  }

  public getRewards(
    page: number = 1,
    pageSize: number = 10,
    tags?: string[] | null,
    categories?: string[],
    locale: string = 'en'
  ): Observable<IReward[]> {
    const headers = new HttpHeaders().set('Accept-Language', locale);
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', pageSize.toString());
    if (tags) {
      params = params.set('tags', tags.join());
    }

    if (categories) {
      params = params.set('categories', categories.join());
    }

    return this.http.get<IV4GetRewardsResponse>(`${this.apiHost}/v4/rewards`, { headers, params })
      .pipe(
        map((res: IV4GetRewardsResponse) => res.data),
        map((rewards: IV4Reward[]) => rewards.map(
          (reward: IV4Reward) => V4RewardsService.v4RewardToReward(reward)
        ))
      );
  }

  public getReward(id: number, userId: string = '', locale: string = 'en'): Observable<IReward> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('user-id', userId)
      .set('Accept-Language', locale);
    return this.http.get<IV4GetRewardResponse>(
      `${this.apiHost}/v4/rewards/${id}`, { headers }
    ).pipe(
      map(res => res.data),
      map((reward: IV4Reward) => V4RewardsService.v4RewardToReward(reward))
    );
  }

  public getAllCatalogs(locale: string = 'en'): Observable<ICatalog[]> {
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
          page++;
          this.getCatalogs(page + 1, pageSize, locale)
            .subscribe(process);
        }
      };
      // do the first query
      return this.getCatalogs(1, pageSize, locale).subscribe(process);
    });
  }

  public getCatalogs(page: number = 1, pageSize: number = 10, locale: string = 'en'): Observable<ICatalog[]> {
    const headers = new HttpHeaders().set('Accept-Language', locale);
    return this.http.get<IV4GetCatalogsResponse>(
      `${this.apiHost}/v4/catalogs`,
      {
        headers,
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

  public getCatalog(id: number, locale: string = 'en'): Observable<ICatalog> {
    const headers = new HttpHeaders().set('Accept-Language', locale);
    return this.http.get<IV4GetCatalogResponse>(
      `${this.apiHost}/v4/catalogs/${id}`,
      { headers }
    ).pipe(
      map(res => res.data),
      map((catalog: IV4Catalog) => V4RewardsService.v4CatalogToCatalog(catalog))
    );
  }

  public getCategories(): Observable<ITabConfigExtended[]> {
    return this.http.get<IV4GetCategoriesResponse>(`${this.apiHost}/v4/categories`).pipe(
      map(res => res.data),
      map(res => Object.values(res.reduce(
        (acc, cur) => cur.usage.includes('Rewards') ? Object.assign(acc, { [cur.id]: cur }) : acc, {})
      )),
      map((categories: IV4Category[]) => categories.map(category => V4RewardsService.v4CategoriesToCategories(category)))
    );
  }

  public getRewardPricesOptions(id: number, locale: string = 'en'): Observable<IPrice[]> {
    const headers = new HttpHeaders().set('Accept-Language', locale);
    return this.http.get<IV4GetRewardPricesResponse>(
      `${this.apiHost}/v4/rewards/${id}/prices`, { headers }
    ).pipe(
      map(res => res.data),
      map((prices: IV4Price[]) => prices.map(
        (price: IV4Price) => V4RewardsService.v4PriceToPrice(price)
      ))
    );
  }
}
