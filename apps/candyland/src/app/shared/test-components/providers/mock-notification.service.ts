import { ICampaignNotificationGroup, IChannel } from '@cl-core/models/campaign/channel-interface';
import { Observable, of } from 'rxjs';
import { IJsonApiListPayload, IWNotificationAttributes } from '@perx/whistler';
import { InformationCollectionSettingType } from '@cl-core/models/campaign/campaign.enum';

export class MockNotificationService {

  public getMockIChanal(): Partial<IChannel> {
    return {
      webNotification: {
        webLink: true,
        webLinkOptions: InformationCollectionSettingType.notRequired,
        id: '1'
      }
    };
  }
  public createNotification(
    data: ICampaignNotificationGroup,
    campaignId: string
  ): Observable<IJsonApiListPayload<IWNotificationAttributes>> {
    console.log(campaignId, data);
    return of(null);
  }

  public getNotifications(campaignId: string): Observable<Partial<IChannel>> {
    console.log(campaignId);
    return of(this.getMockIChanal());
  }

  public deleteNotification(id: string): Observable<IJsonApiListPayload<IWNotificationAttributes>> {
    console.log(id);
    return of(null);
  }
  public updateNotification(
    data: ICampaignNotificationGroup,
    campaignId: string
  ): Observable<IJsonApiListPayload<IWNotificationAttributes>> {
    console.log(data, campaignId);
    return of(null);
  }
}
