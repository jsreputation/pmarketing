import { switchMap, map } from 'rxjs/operators';
import {
  IStampCard,
  IStamp,
  StampCardState,
  StampState,
  IReward, } from './models/stamp.model';
import { IVoucher } from '../vouchers/models/voucher.model';
import { IVoucherService } from '../vouchers/ivoucher.service';
import { IJsonApiItemPayload, IJsonApiItem } from '../jsonapi.payload';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config/config';
// http://api-dev1.uat.whistler.perxtech.io/loyalty/engagements/
// actual card

// http://api-dev1.uat.whistler.perxtech.io/campaign/entities/
// commchannel

interface AttbsObjEntity {
    urn: string;
    created_at: string;
    updated_at: string;
    name: string;
    status: string;
    goal: null;
    start_date_time: null;
    end_date_time: null;
    comm_channel: null;
    engagement_type: string;
    engagement_id: number;
    pool_id: null;
}

interface AttbsObjStamp {
    urn: string;
    created_at: string;
    updated_at: string;
    title: string;
    description: string;
    image_url: string;
    properties: object;
    display_properties: {
      slots: number[];
      title: string;
      button: string;
      nb_of_slots: number;
      pre_stamp_img_url: string;
      post_stamp_img_url: string;
      reward_pre_stamp_img_url: string;
      reward_post_stamp_img_url: string;
    };
}

@Injectable({
  providedIn: 'root'
})
export class WStampService implements StampService {
  public baseUrl: string;

  constructor(
    private http: HttpClient,
    config: Config,
    private vouncersService: IVoucherService
  ) {
    this.baseUrl = `${config.apiHost}`;
  }

  private static WStampCardToStampCard(stampCard: )

  public getCards(campaignId: number): Observable<IStampCard[]> {
    return this.http.get<IJsonApiItemPayload<AttbsObjEntity>>(`${this.hostName}/campaign/entities/${campaignId}`)
    .pipe(
      map(res => res.data.attributes),
      map(correctEntityAttribute => correctEntityAttribute.engagement_id),
      switchMap(correctId => this.getCurrentCard(correctId)),
      map((stamp: IStamp) => [stamp])
    );
  }
  // actually using engagementId
  public getCurrentCard(campaignId: number): Observable<IStampCard> {
    return this.http.get<IJsonApiItemPayload<AttbsObjStamp>>(
      `${this.hostName}/loyalty/engagements/${campaignId}`
    )
    .pipe(
      map((res) => this.WStampCardToStampCard(res.data.attributes))
    )
  }

  public getStamps(campaignId: number): Observable<IStamp[]> {
    throw new Error('Method not implemented.');
  }

  public putStamp(stampId: number): Observable<IStamp> {
    throw new Error('Method not implemented.');

  }

  public stampAll(cardId: number): Observable<IStamp[]> {

  }
}
