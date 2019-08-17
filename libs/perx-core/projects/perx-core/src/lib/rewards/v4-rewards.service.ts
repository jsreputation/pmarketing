import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvConfig } from '../shared/env-config';
import { concatAll, map, mergeMap, reduce } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { RewardsService } from './rewards.service';
import { IReward, ICatalog } from './models/reward.model';

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
}

interface IV4GetRewardsResponse {
  data: IV4Reward[];
  meta?: IV4Meta;
}

interface IV4GetRewardResponse {
  data: IV4Reward;
}

interface IV4GetCatalogsResponse {
  data: IV4Catalog[];
  meta?: IV4Meta;
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
  private rewardMeta: IV4Meta = {};
  private catalogMeta: IV4Meta = {};

  constructor(private http: HttpClient, config: EnvConfig) {
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
      howToRedeem: reward.how_to_redeem
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

  public getTags(): void {
    // todo: api not implemented yet
  }

  public getAllRewards(): Observable<IReward[]> {
    const pageSize = 100;
    return this.getRewards(1, pageSize).pipe(
      mergeMap(reward => {
        const streams = [
          of(reward)
        ];
        for (let i = 2; i <= this.rewardMeta.total_pages; i++) {
          const stream = this.getRewards(i, pageSize);
          streams.push(stream);
        }
        return streams;
      }),
      concatAll(),
      reduce((acc: IReward[], curr: IReward[]) => acc.concat(curr), [])
    );
  }

  public getRewards(page: number = 1, pageSize: number = 25): Observable<IReward[]> {
    return this.http.get<IV4GetRewardsResponse>(
      `${this.apiHost}/v4/rewards`,
      {
        params: {
          page: `${page}`,
          size: `${pageSize}`
        }
      }
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
}
