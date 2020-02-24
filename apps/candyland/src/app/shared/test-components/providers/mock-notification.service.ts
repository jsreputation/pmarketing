import { IChannel } from '@cl-core/models/campaign/channel-interface';
import { Observable, of } from 'rxjs';
import { IJsonApiListPayload, IWNotificationAttributes } from '@perx/whistler';
import { InformationCollectionSettingType } from '@cl-core/models/campaign/campaign.enum';
import { NotificationService } from '@cl-core/services/notification.service';

export class MockNotificationService implements Partial<NotificationService> {
  private getMockIChanal(): Partial<IChannel> {
    return {
      webNotification: {
        webLink: true,
        webLinkOptions: InformationCollectionSettingType.notRequired,
        id: '1'
      }
    };
  }
  public createNotification(): Observable<IJsonApiListPayload<IWNotificationAttributes>> {
    return of(null);
  }

  public getNotifications(): Observable<Partial<IChannel>> {
    return of(this.getMockIChanal());
  }

  public deleteNotification(): Observable<IJsonApiListPayload<IWNotificationAttributes>> {
    return of(null);
  }
  public updateNotification(): Observable<IJsonApiListPayload<IWNotificationAttributes>> {
    return of(null);
  }
}
