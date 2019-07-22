import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvConfig } from '../shared/env-config';
import { concatAll, map, mergeMap, reduce } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { RewardsService } from './rewards.service';
import { IReward } from './models/reward.model';

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
  tags?: IV4Tag[];
}

interface IV4GetRewardsResponse {
  data: IV4Reward[];
  meta?: IV4Meta;
}

interface IV4GetRewardResponse {
  data: IV4Reward;
}

@Injectable({
  providedIn: 'root'
})
export class V4RewardsService extends RewardsService {

  private apiHost: string;
  private rewardMeta: IV4Meta = {};

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
      `${ this.apiHost }/v4/rewards`,
      {
        params: {
          page: `${ page }`,
          size: `${ pageSize }`
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
      `${ this.apiHost }/v4/reward/${ id }`
    ).pipe(
      map(res => res.data),
      map((reward: IV4Reward) => V4RewardsService.v4RewardToReward(reward))
    );
  }

}
