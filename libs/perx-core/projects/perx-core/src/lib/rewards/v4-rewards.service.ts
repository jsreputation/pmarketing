import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {EnvConfig} from '../shared/env-config';
import {concatAll, map, mergeMap, reduce, switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {RewardsService} from './rewards.service';
import {IReward, ICatalog, IPrice, ICategoryTags} from './models/reward.model';
import {IVoucher, VoucherState} from '../vouchers/models/voucher.model';
import {VouchersService} from '../vouchers/vouchers.service';

interface IV4Meta {
  count?: number;
  size?: number;
  total_pages?: number;
  page?: number;
}

interface IV4Tag {
  id: number;
  name: string;
}

interface IV4Image {
  type: string;
  url: string;
}

interface IV4RewardPrice {
  reward_currency: string;
  reward_amount: string;
}

interface IV4Reward {
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
  tags?: IV4Tag[];
  category_tags?: ICategoryTags[];
}

interface IV4Price {
  id: number;
  reward_campaign_id: number;
  price?: number;
  currency_code?: string;
  points?: number;
}

interface IV4MinifiedVoucher {
  id: number;
  voucher_code: string;
  voucher_key: string;
  state: VoucherState;
  custom_fields: any;
  reserved_expires_at: Date;
}

interface IV4GetRewardsResponse {
  data: IV4Reward[];
  meta?: IV4Meta;
}

interface IV4GetRewardResponse {
  data: IV4Reward;
}

interface IV4GetRewardPricesResponse {
  data: IV4Price[];
  meta?: IV4Meta;
}

interface IV4GetCatalogsResponse {
  data: IV4Catalog[];
  meta?: IV4Meta;
}

interface IV4GetCatalogResponse {
  data: IV4Catalog;
}

interface IV4ReserveRewardResponse {
  data: IV4MinifiedVoucher;
  meta?: IV4Meta;
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
  private rewardMeta: IV4Meta = {};
  private catalogMeta: IV4Meta = {};

  constructor(private http: HttpClient,
              private voucherService: VouchersService,
              config: EnvConfig) {
    super();
    this.apiHost = config.env.apiHost as string;
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
    const merchantImg = reward[`merchantImg`] ? reward[`merchantImg`] : null;

    return {
      id: reward.id,
      name: reward.name,
      subtitle: reward.subtitle,
      description: reward.description,
      rewardPrice: reward.reward_price.map(price => ({
        rewardCurrency: price.reward_currency,
        rewardAmount: price.reward_amount
      })),
      rewardThumbnail: thumbnailImg,
      rewardBanner,
      validFrom: reward.valid_from,
      validTo: reward.valid_to,
      merchantId: reward.merchant_id,
      merchantName: reward.merchant_name,
      merchantImg,
      merchantWebsite: reward.merchant_website,
      termsAndConditions: reward.terms_and_conditions,
      howToRedeem: reward.how_to_redeem,
      categoryTags: reward.category_tags
    };
  }

  public static v4CatalogToCatalog(catalog: IV4Catalog): ICatalog {
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
      points: price.points
    };
  }

  public getTags(): void {
    // todo: api not implemented yet
  }

  public getAllRewards(tags?: string[], categories?: string[]): Observable<IReward[]> {
    const pageSize = 100;
    return this.getRewards(1, pageSize, tags, categories).pipe(
      mergeMap(reward => {
        const streams = [
          of(reward)
        ];
        for (let i = 2; i <= this.rewardMeta.total_pages; i++) {
          const stream = this.getRewards(i, pageSize, tags, categories);
          streams.push(stream);
        }
        return streams;
      }),
      concatAll(),
      reduce((acc: IReward[], curr: IReward[]) => acc.concat(curr), [])
    );
  }

  public reserveReward(rewardId: number, priceId?: number, locationId?: number): Observable<IVoucher> {
    return this.http.get<IV4ReserveRewardResponse>(
      `${this.apiHost}/v4/rewards/${rewardId}/reserve`,
      {
        params: {
          location_id: `${locationId ? locationId : ''}`,
          price_id: `${priceId ? priceId : ''}`
        }
      }
    ).pipe(
      map(res => res.data),
      switchMap((minVoucher: IV4MinifiedVoucher) => this.voucherService.get(minVoucher.id)),
    );
  }

  public getRewards(page: number = 1, pageSize: number = 25, tags?: string[], categories?: string[]): Observable<IReward[]> {

    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', pageSize.toString());

    if (tags) {
      params = params.set('tags', tags.join());
    }

    if (categories) {
      params = params.set('categories', categories.join());
    }

    return this.http.get<IV4GetRewardsResponse>(
      `${this.apiHost}/v4/rewards`, {params}
    ).pipe(
      map((res: IV4GetRewardsResponse) => {
        if (res.meta) {
          this.rewardMeta = {
            ...this.rewardMeta,
            ...res.meta
          };
        }
        return res.data;
      }),
      map((rewards: IV4Reward[]) => rewards.map(
        (reward: IV4Reward) => V4RewardsService.v4RewardToReward(reward)
      ))
    );
  }

  public getReward(id: number): Observable<IReward> {
    return this.http.get<IV4GetRewardResponse>(
      `${this.apiHost}/v4/rewards/${id}`
    ).pipe(
      map(res => res.data),
      map((reward: IV4Reward) => V4RewardsService.v4RewardToReward(reward))
    );
  }

  public getAllCatalogs(): Observable<ICatalog[]> {
    const pageSize = 100;
    return this.getCatalogs(1, pageSize).pipe(
      mergeMap(catalog => {
        const streams = [
          of(catalog)
        ];
        for (let i = 2; i <= this.catalogMeta.total_pages; i++) {
          const stream = this.getCatalogs(i, pageSize);
          streams.push(stream);
        }
        return streams;
      }),
      concatAll(),
      reduce((acc: ICatalog[], curr: ICatalog[]) => acc.concat(curr), [])
    );
  }

  public getCatalogs(page: number = 1, pageSize: number = 25): Observable<ICatalog[]> {
    return this.http.get<IV4GetCatalogsResponse>(
      `${this.apiHost}/v4/catalogs`,
      {
        params: {
          page: `${page}`,
          size: `${pageSize}`
        }
      }
    ).pipe(
      map((res: IV4GetCatalogsResponse) => {
        if (res.meta) {
          this.catalogMeta = {
            ...this.catalogMeta,
            ...res.meta
          };
        }
        return res.data;
      }),
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
