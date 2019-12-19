import { Observable } from 'rxjs';
import { ClHttpParams } from '@cl-helpers/http-params';
import { map } from 'rxjs/operators';
import { JsonApiParser } from '@cl-helpers/json-api-parser';
import { Injectable } from '@angular/core';
import { NotificationHttpService } from '@cl-core/http-services/notification-http.service';
import { NotificationHttpAdapter } from '@cl-core/http-adapters/notification-http-adapter';
import { IWNotificationAttributes } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private notificationHttpService: NotificationHttpService) {}

  public createNotification(data: ICampaignNotificationGroup, campaignId: string)
    : Observable<IJsonApiListPayload<IWNotificationAttributes>> {
    const sendData = NotificationHttpAdapter.transformToNotification(data, campaignId);
    return this.notificationHttpService.createNotification({ data: sendData });
  }

  public getNotifications(campaignId: string): Observable<Partial<IChannel>> {
    const httpParams = ClHttpParams.createHttpParams({
      include: 'template',
      'filter[entity_id]': campaignId
    });
    return this.notificationHttpService.getNotifications(httpParams)
      .pipe(
        map(res => {
            const notifications = JsonApiParser.parseDataWithIncludes(
              res,
              NotificationHttpAdapter.handlerTransformNotifications, {
                'Ros::Comm::Template': {
                  fieldName: 'template',
                  adapterFunction: NotificationHttpAdapter.transformTemplate
                }
              });
            return NotificationHttpAdapter.transformToChannelForm(notifications);
          }
        ),
      );
  }

  public deleteNotification(id: string): Observable<IJsonApiListPayload<IWNotificationAttributes>> {
    return this.notificationHttpService.deleteNotification(id);
  }

  public updateNotification(data: ICampaignNotificationGroup, campaignId: string)
    : Observable<IJsonApiListPayload<IWNotificationAttributes>> {
    const sendData = NotificationHttpAdapter.transformToNotification(data, campaignId);
    return this.notificationHttpService.updateNotification(sendData.id, { data: sendData });
  }
}
