import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { formatNumber } from '@angular/common';
import { EMPTY, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { oc } from 'ts-optchain';

import { IWRewardDisplayProperties } from '@perxtech/whistler';

import { RewardsService } from './rewards.service';
import {
  ICatalog,
  ICategoryTags,
  IPrice,
  IReward,
  ISearchHistory,
  ITrending,
  ISearchSuggestion,
  Sort
} from './models/reward.model';

import { RewardStateHelper } from './reward-state-helper';
import { ITabConfigExtended } from './rewards-list-tabbed/rewards-list-tabbed.component';
import { ConfigService } from '../config/config.service';
import { IConfig } from '../config/models/config.model';
import { CampaignType } from '../campaign/models/campaign.model';
import { IV4OperatingHours } from '../campaign/v4-campaign.service';
import { ITag } from '../merchants/models/merchants.model';

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
  reward_limit_per_user_per_period?: number | null;
  reward_limit_per_user_per_period_balance: {
    available_amount: number;
    limit_error_klass: null;
    limit_type: string;
  } | null;
}

interface IV4CustomField {
  faq_link: string;
  tnc_link: string;
  points_requirement: string; // to convert to number
  referrals_requirement: string;
  reward_description: string;
  card_link: string;
}


export interface IV4Reward {
  id: number;
  name: string;
  description: string;
  subtitle: string;
  valid_from: Date;
  valid_to: Date;
  is_favorite: boolean;
  reward_price?: IV4RewardPrice[];
  images?: IV4Image[];
  loyalty: IV4LoyaltyTierInfo[];
  merchant_id?: number;
  merchant_name?: string;
  merchant_website?: string;
  terms_and_conditions?: string;
  steps_to_redeem?: string;
  tags?: ITag[];
  category_tags?: ICategoryTags[];
  inventory?: IV4Inventory;
  selling_from?: string;
  selling_to?: string;
  merchant_logo_url?: string;
  display_properties?: IWRewardDisplayProperties;
  custom_fields?: IV4CustomField;
  referee_required_for_reward?: number;
  referee_balance_to_next_reward?: number;
  operating_hour?: IV4OperatingHours;
  operating_now?: boolean;
  distance?: {value:number, unit_of_measure:string};
  score?: number;
}

interface IV4Price {
  id: number;
  reward_campaign_id: number;
  price?: number;
  currency_code?: string;
  points?: number;
  identifier?: string;
}

export interface IV4Trending {
  value: string;
}

interface IV4GetTrendingResponse {
  data: IV4Trending[];
}

interface IV4GetSearchHistoryResponse {
  data: IV4SearchHistory[];
}

interface IV4GetRewardsResponse {
  data: IV4Reward[];
}

interface IV4GetSearchRewardsResponse {
  data: {
    rewards: {
      reward: IV4Reward,
      score: number;
    }[]
  };
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

interface IV4LoyaltyTierInfo {
  attained: boolean;
  loyalty_id: number;
  loyalty_name: string;
  loyalty_points_required_for_redemption: number;
  sneak_peek: boolean;
}

interface IV4GetAllCategoriesResponse {
  data: ICategoryTags[];
}

interface IV4SearchHistory {
  value: string;
}

interface IV4GetSearchSuggestionResponse {
  data: ISearchSuggestion[];
}

@Injectable({
  providedIn: 'root',
})
export class V4RewardsService extends RewardsService {

  private apiHost: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    super();
    this.configService.readAppConfig().subscribe((config: IConfig<void>) => {
      this.apiHost = config.apiHost as string;
    });
  }

  public static v4RewardToReward(
    reward: IV4Reward,
    campaignType?: CampaignType
  ): IReward {
    const images = reward.images || [];
    let thumbnail = images.find(
      (image: IV4Image) => image.type === 'reward_thumbnail'
    );
    if (thumbnail === undefined) {
      thumbnail = images.find(
        (image: IV4Image) => image.type === 'reward_logo'
      );
    }
    const thumbnailImg = thumbnail && thumbnail.url;
    const banner = images.find(
      (image: IV4Image) => image.type === 'reward_banner'
    );
    const rewardBanner: string = oc(banner).url('');

    const miscImg1 = images.find(
      (image: IV4Image) => image.type === 'misc_image_1'
    )?.url;
    const miscImg2 = images.find(
      (image: IV4Image) => image.type === 'misc_image_2'
    )?.url;
    const merchantImg = oc(reward).merchant_logo_url();
    const sellingFrom = reward.selling_from
      ? new Date(reward.selling_from)
      : undefined;
    const sellingTo = reward.selling_to
      ? new Date(reward.selling_to)
      : undefined;
    const loyaltyTierInfo = reward.loyalty
      ? reward.loyalty.map((tier) => ({
          attained: tier.attained,
          id: tier.loyalty_id,
          loyaltyName: tier.loyalty_name,
          loyaltyPointsRequiredForRedemption:
            tier.loyalty_points_required_for_redemption,
          sneakPeek: tier.sneak_peek,
        }))
      : [];

    const v4Invent = reward.inventory;
    const inventory = v4Invent
      ? {
          rewardTotalBalance:
            v4Invent.reward_total_balance !== undefined
              ? v4Invent.reward_total_balance
              : null,
          rewardTotalLimit:
            v4Invent.reward_total_limit !== undefined
              ? v4Invent.reward_total_limit
              : null,
          rewardLimitPerUserBalance:
            v4Invent.reward_limit_per_user_balance !== undefined &&
            v4Invent.reward_limit_per_user_balance
              ? v4Invent.reward_limit_per_user_balance.available_amount
              : null,
          rewardLimitPerUserPerPeriodBalance:
            v4Invent.reward_limit_per_user_per_period !== undefined &&
            v4Invent.reward_limit_per_user_per_period_balance
              ? v4Invent.reward_limit_per_user_per_period_balance
                  .available_amount
              : null,
        }
      : undefined;

    let operatingHours;
    if (reward.operating_hour) {
      operatingHours = {
        id: reward.operating_hour.id,
        closesAt: reward.operating_hour.closes_at,
        opensAt: reward.operating_hour.opens_at,
        days: reward.operating_hour.days,
        formattedOffset: reward.operating_hour.formatted_offset,
      };
    }

    return {
      id: reward.id,
      name: reward.name,
      subtitle: reward.subtitle,
      description: reward.description,
      favorite: reward.is_favorite,
      loyalty: loyaltyTierInfo,
      rewardPrice: reward.reward_price
        ? reward.reward_price.map((price) => ({
          id: price.id,
          currencyCode: price.currency_code,
          price: Number(price.price || 0).toFixed(2),
          points: price.points,
          identifier: price.identifier,
        }))
        : undefined,
      rewardThumbnail: thumbnailImg,
      rewardState: RewardStateHelper.getRewardState(
        (reward as unknown) as IReward
      ),
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
      customFields: reward.custom_fields
        ? {
          requirement: campaignType
            ? V4RewardsService.custFieldRequirementSelector(
              campaignType,
              reward.custom_fields
            )
            : reward.custom_fields.points_requirement ||
            reward.custom_fields.referrals_requirement,
          requirementDescription:
            reward.custom_fields.reward_description || '',
          faqLink: reward.custom_fields.faq_link,
          tncLink: reward.custom_fields.tnc_link,
          cardLink: reward.custom_fields.card_link,
        }
        : undefined,
      operatingHours,
      isOperating: reward.operating_now,
      tags: reward?.tags,
      distance: { value: reward?.distance?.value, unitOfMeasure: reward?.distance?.unit_of_measure },
      score: reward?.score,
      miscImages: {
        miscImage1: miscImg1 || '',
        miscImage2: miscImg2 || ''
      }
    };
  }

  public static custFieldRequirementSelector(
    campaignType: CampaignType,
    customField: IV4CustomField
  ): string {
    switch (campaignType) {
      case CampaignType.give_reward:
        return customField.points_requirement;
      case CampaignType.invite:
        return customField.referrals_requirement;
      default:
        return customField.points_requirement;
    }
  }

  private static v4CatalogToCatalog(catalog: IV4Catalog): ICatalog {
    const images = catalog.images || [];
    let thumbnail = images.find(
      (image: IV4Image) => image.type === 'catalog_thumbnail'
    );
    if (thumbnail === undefined) {
      thumbnail = images.find(
        (image: IV4Image) => image.type === 'catalog_logo'
      );
    }
    const thumbnailImg = oc(thumbnail).url('');
    const banner = images.find(
      (image: IV4Image) => image.type === 'catalog_banner'
    );
    const catalogBanner = oc(banner).url('');
    const rewards =
      catalog.rewards &&
      catalog.rewards.map((reward: IV4Reward) =>
        V4RewardsService.v4RewardToReward(reward)
      );
    return {
      id: catalog.id,
      name: catalog.name,
      description: catalog.description,
      catalogThumbnail: thumbnailImg,
      catalogBanner,
      rewardCount: catalog.catalog_results.count,
      rewards,
    };
  }

  private static v4CategoriesToCategories(
    category: IV4Category
  ): ITabConfigExtended {
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
      identifier: price.identifier,
    };
  }

  public getAllFavoriteRewards(
    tags?: string[] | null,
    categories?: string[],
    locale: string = 'en'
  ): Observable<IReward[]> {
    return this.getAllRewards(tags, categories, locale, true);
  }

  public getAllRewards(
    tags?: string[] | null,
    categories?: string[],
    locale: string = 'en',
    filterFavorites?: boolean
  ): Observable<IReward[]> {
    return new Observable((subject) => {
      const pageSize = 100;
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
          this.getRewards(
            page,
            pageSize,
            tags,
            categories,
            locale,
            filterFavorites
          ).subscribe(process);
        }
      };
      // do the first query
      return this.getRewards(
        1,
        pageSize,
        tags,
        categories,
        locale,
        filterFavorites
      ).subscribe(process);
    });
  }

  public getRewards(
    page: number = 1,
    pageSize: number = 10,
    tags?: string[] | null,
    categories?: string[],
    locale: string = 'en',
    filterFavorites?: boolean,
    sort?: Sort,
    sortBy?: string | null,
    categoryIds?: number[] | null,
  ): Observable<IReward[]> {
    const headers = new HttpHeaders().set('Accept-Language', locale);
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', pageSize.toString());
    if (tags) {
      params = params.set('tags', tags.join('|'));
    }

    if (categories) {
      params = params.set('categories', categories.join('|'));
    }

    if (filterFavorites) {
      params = params.set('favorite', 'true');
    }

    if (sort && sortBy) {
      // order & sort_by required. supported fields: id, ends_at, begins_at, state, name
      params = params.set('order', sort);
      params = params.set('sort_by', sortBy);
    }

    if (categoryIds) {
      params = params.set('category_ids', categoryIds.join('|'));
    }

    return this.http
      .get<IV4GetRewardsResponse>(`${this.apiHost}/v4/rewards`, {
        headers,
        params,
      })
      .pipe(
        map((res: IV4GetRewardsResponse) => res.data),
        map((rewards: IV4Reward[]) =>
          rewards.map((reward: IV4Reward) =>
            V4RewardsService.v4RewardToReward(reward)
          )
        )
      );
  }
  public getReward(
    id: number,
    userId: string = '',
    locale: string = 'en'
  ): Observable<IReward> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('user-id', userId)
      .set('Accept-Language', locale);
    return this.http
      .get<IV4GetRewardResponse>(`${this.apiHost}/v4/rewards/${id}`, {
        headers,
      })
      .pipe(
        map((res) => res.data),
        map((reward: IV4Reward) => V4RewardsService.v4RewardToReward(reward))
      );
  }

  public getAllCatalogs(locale: string = 'en'): Observable<ICatalog[]> {
    return new Observable((subject) => {
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
          this.getCatalogs(page + 1, pageSize, locale).subscribe(process);
        }
      };
      // do the first query
      return this.getCatalogs(1, pageSize, locale).subscribe(process);
    });
  }

  public getCatalogs(
    page: number = 1,
    pageSize: number = 10,
    locale: string = 'en',
    sort?: Sort,
    sortBy?: string | null
  ): Observable<ICatalog[]> {
    const headers = new HttpHeaders().set('Accept-Language', locale);
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', pageSize.toString());

    // VS-5212
    if (sort && sortBy) {
      params = params.set('order_by', sort).set('sort_by', sortBy);
    }

    return this.http
      .get<IV4GetCatalogsResponse>(`${this.apiHost}/v4/catalogs`, {
        headers,
        params,
      })
      .pipe(
        map((res: IV4GetCatalogsResponse) => res.data),
        map((catalogs: IV4Catalog[]) =>
          catalogs.map((catalog: IV4Catalog) =>
            V4RewardsService.v4CatalogToCatalog(catalog)
          )
        )
      );
  }

  public getCatalog(id: number, locale: string = 'en'): Observable<ICatalog> {
    const headers = new HttpHeaders().set('Accept-Language', locale);
    return this.http
      .get<IV4GetCatalogResponse>(`${this.apiHost}/v4/catalogs/${id}`, {
        headers,
      })
      .pipe(
        map((res) => res.data),
        map((catalog: IV4Catalog) =>
          V4RewardsService.v4CatalogToCatalog(catalog)
        )
      );
  }

  public getCategories(): Observable<ITabConfigExtended[]> {
    return this.http
      .get<IV4GetCategoriesResponse>(`${this.apiHost}/v4/categories`)
      .pipe(
        map((res) => res.data),
        map((res) =>
          Object.values(
            res.reduce(
              (acc, cur) =>
                cur.usage.includes('Rewards')
                  ? Object.assign(acc, { [cur.id]: cur })
                  : acc,
              {}
            )
          )
        ),
        map((categories: IV4Category[]) =>
          categories.map((category) =>
            V4RewardsService.v4CategoriesToCategories(category)
          )
        )
      );
  }

  public getRewardPricesOptions(
    id: number,
    locale: string = 'en'
  ): Observable<IPrice[]> {
    const headers = new HttpHeaders().set('Accept-Language', locale);
    return this.http
      .get<IV4GetRewardPricesResponse>(
        `${this.apiHost}/v4/rewards/${id}/prices`,
        { headers }
      )
      .pipe(
        map((res) => res.data),
        map((prices: IV4Price[]) =>
          prices.map((price: IV4Price) =>
            V4RewardsService.v4PriceToPrice(price)
          )
        )
      );
  }

  public nearMe(
    rad: number = 20,
    lat: number,
    lng: number,
    page?: number,
    pageSize?: number,
    tags?: string[] | string,
    categories?: string[] | string,
  ): Observable<IReward[]> {
    let params = new HttpParams()
    if(page) {
      params= params.set('page', page.toString());
    }
    if(pageSize) {
      params= params.set('size', pageSize.toString());
    }
    if (tags) {
      params = params.set('tags', Array.isArray(tags) ? tags.join('|') : tags);
    }
    if (categories) {
      params = params.set('categories', Array.isArray(categories) ? categories.join('|'): categories);
    }
    return this.http
      .get<IV4GetRewardsResponse>(
        `${this.apiHost}/v4/rewards?radius=${rad}&lat=${lat}&lng=${lng}`,{ params }
      )
      .pipe(
        map((res: IV4GetRewardsResponse) => res.data),
        map((rewards: IV4Reward[]) =>
          rewards.map((reward: IV4Reward) =>
            V4RewardsService.v4RewardToReward(reward)
          )
        )
      );
  }

  public favoriteReward(rewardId: number): Observable<IReward> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    if (rewardId !== undefined) {
      return this.http
        .post<IV4GetRewardResponse>(
          `${this.apiHost}/v4/rewards/${rewardId}/favorite`,
          { headers }
        )
        .pipe(
          map((res) => res.data),
          map((reward: IV4Reward) => V4RewardsService.v4RewardToReward(reward))
        );
    }
    return EMPTY;
  }

  public unfavoriteReward(rewardId: number): Observable<IReward> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    if (rewardId !== undefined) {
      return this.http
        .delete<IV4GetRewardResponse>(
          `${this.apiHost}/v4/rewards/${rewardId}/favorite`,
          { headers }
        )
        .pipe(
          map((res) => res.data),
          map((reward: IV4Reward) => V4RewardsService.v4RewardToReward(reward))
        );
    }
    return EMPTY;
  }

  public getAllCategories(): Observable<ICategoryTags[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http
      .get<IV4GetAllCategoriesResponse>(`${this.apiHost}/v4/categories`, {
        headers,
      })
      .pipe(
        map((res) => res.data)
      );
  }

  public getTrending(): Observable<ITrending[]> {
    return this.http
      .get<IV4GetTrendingResponse>(`${this.apiHost}/v4/search/trending`)
      .pipe(
        map((res) => res.data),
        map((res: IV4Trending[]) =>
          res.map((item) => ({ ...item })
          ))
      );
  }

  public getRewardsRelated(rewardId: number, pageSize: number = 10): Observable<IReward[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = new HttpParams()
      .set('size', pageSize.toString());
    return this.http.get<IV4GetRewardsResponse>(`${this.apiHost}/v4/rewards/${rewardId}/related`, { headers, params }).pipe(
      map((res: IV4GetRewardsResponse) => res.data),
      map((rewards: IV4Reward[]) => rewards.map(
        (reward: IV4Reward) => V4RewardsService.v4RewardToReward(reward)
      ))
    );
  }

  public getSearchHistory(): Observable<ISearchHistory[]> {
    return this.http.get<IV4GetSearchHistoryResponse>(`${this.apiHost}/v4/search/history`)
      .pipe(
        map((res: IV4GetSearchHistoryResponse) => res.data),
        map((searchHistories: IV4SearchHistory[]) => searchHistories.map(
          (searchHistory: IV4SearchHistory) => ({ ...searchHistory })
        ))
      );
  }

  public getSearchSuggestion(query: string): Observable<ISearchSuggestion[]> {
    return this.http.get<IV4GetSearchSuggestionResponse>(`${this.apiHost}/v4/search/suggestion?search_string=${query}`)
      .pipe(
        map((res: IV4GetSearchSuggestionResponse) => res.data)
      );
  }

  public searchRewards(text: string,page: number, pageSize: number, tags?: string, locale= "en"): Observable<IReward[]> {
    const endpoint = tags ? `${this.apiHost}/v4/search?search_string=${text}&tags=${tags}` : `${this.apiHost}/v4/search?search_string=${text}`;
    const headers = new HttpHeaders().set('Accept-Language', locale);
    let params = new HttpParams()
    .set('page', page.toString())
    .set('size', pageSize.toString());
    return this.http
      .get<IV4GetSearchRewardsResponse>(endpoint, { headers, params })
      .pipe(
        map((res: IV4GetSearchRewardsResponse) =>
          res.data.rewards.map((item) => {
            return { ...item.reward, score: item.score };
          })
        ),
        map((rewards: IV4Reward[]) =>
          rewards.map((reward: IV4Reward) =>
            V4RewardsService.v4RewardToReward(reward)
          )
        )
      );
  }
}
