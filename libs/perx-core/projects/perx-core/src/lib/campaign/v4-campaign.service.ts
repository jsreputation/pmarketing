import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICampaign, CampaignType, CampaignState } from './models/campaign.model';
import {ICampaignFilterOptions, ICampaignService} from './icampaign.service';
import { V4RewardsService, IV4Reward } from '../rewards/v4-rewards.service';
import { Config } from '../config/config';
import { IV4Voucher, V4VouchersService } from '../vouchers/v4-vouchers.service';
import { IVoucher } from '../vouchers/models/voucher.model';

interface IV4Image {
  type: string;
  url: string;
}

interface IV4Campaign {
  id: number;
  name: string;
  description: string;
  begins_at: string;
  ends_at?: string;
  enrolled: boolean;
  campaign_type: CampaignType;
  images: IV4Image[];
  favourite: boolean;
  custom_fields: any;
  category_tags: any[];
  tags: any[];
  state: CampaignState;
  rewards?: IV4Reward[];
}

interface IV4CampaignResponse {
  data: IV4Campaign;
  meta: {
    count: number;
  };
}

interface IV4CampaignsResponse {
  data: IV4Campaign[];
  meta: {
    count: number;
  };
}

interface IV4IssueCampaignResponse {
  data: IV4Voucher[];
}

@Injectable({ providedIn: 'root' })
export class V4CampaignService implements ICampaignService {
  public baseUrl: string;

  constructor(private http: HttpClient, config: Config) {
    this.baseUrl = config.apiHost as string;
  }

  public static v4CampaignToCampaign(campaign: IV4Campaign): ICampaign {
    const thumbnail = campaign.images.find(image => ['catalog_thumbnail', 'campaign_thumbnail'].some(ty => ty === image.type));
    const thumbnailUrl = thumbnail ? thumbnail.url : undefined;
    const campaignBanner = campaign.images.find(i => i.type === 'campaign_banner');
    const campaignBannerUrl = campaignBanner ? campaignBanner.url : undefined;
    const rewards = campaign.rewards && campaign.rewards.map((reward: IV4Reward) => V4RewardsService.v4RewardToReward(reward));

    return {
      id: campaign.id,
      name: campaign.name,
      description: campaign.description,
      type: campaign.campaign_type,
      state: campaign.state,
      endsAt: campaign.ends_at ? new Date(campaign.ends_at) : null,
      beginsAt: campaign.begins_at ? new Date(campaign.begins_at) : null,
      rewards,
      thumbnailUrl,
      campaignBannerUrl
    };
  }

  public getCampaigns(filterOptions: ICampaignFilterOptions): Observable<ICampaign[]> {
    let params = new HttpParams();
    if (filterOptions) {
      Object.keys(filterOptions).forEach(key => {
        if (filterOptions.hasOwnProperty(key)) {
          if ( key === 'type' ) {
            params = params.set('campaign_type', filterOptions[key] || '');
          } else {
            params = params.set(key, filterOptions[key]);
          }
        }
      });
    }
    return this.http.get<IV4CampaignsResponse>(`${this.baseUrl}/v4/campaigns`, { params })
      .pipe(
        map(resp => resp.data),
        map((campaigns: IV4Campaign[]) => campaigns.map(campaign => V4CampaignService.v4CampaignToCampaign(campaign)))
      );
  }

  public getCampaign(id: number): Observable<ICampaign> {
    return this.http.get<IV4CampaignResponse>(`${this.baseUrl}/v4/campaigns/${id}`)
      .pipe(
        map(resp => resp.data),
        map((campaign: IV4Campaign) => V4CampaignService.v4CampaignToCampaign(campaign))
      );
  }

  public issueAll(id: number): Observable<IVoucher[]> {
    return this.http.post<IV4IssueCampaignResponse>(`${this.baseUrl}/v4/campaigns/${id}/issue_all`, null)
      .pipe(
        map(resp => resp.data),
        map((vouchers: IV4Voucher[]) => vouchers.map(voucher => V4VouchersService.v4VoucherToVoucher(voucher)))
      );
  }
}
