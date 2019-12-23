import { IWNotificationAttributes, IJsonApiItem } from '@perx/whistler';
import { CampaignChannelsLaunchType } from '../../campaigns/models/campaign-channels-launch-type.enum';
import { NotificationsMenu } from '../../campaigns/models/notifications-menu-enum';

export class NotificationHttpAdapter {
  public static launchType: typeof CampaignChannelsLaunchType = CampaignChannelsLaunchType;
  public static notificationsFormGroups: typeof NotificationsMenu = NotificationsMenu;

  public static transformToNotification(data: ICampaignNotificationGroup, campaignId: string): any {
    const res = {
      type: 'notifications',
      attributes: {
        notification_type: '',
        payload: {},
        segment: {},
        template_id: data.templateId,
        provider_id: 1,
        channel: 'sms',
        entity_id: campaignId
      }
    };
    const type = data.sentType;

    if (type === NotificationHttpAdapter.launchType.launchDate
      && data.time && data.type) {
      res.attributes.payload['send_at'] = data.time;
      res.attributes['notification_type'] = type;
      res.attributes.payload['new_status'] = 'ended';
      res.attributes.payload['send_on'] = {
        period: data.numberPeriod,
        units: data.type
      };
    }

    // type campaign_launch_date
    if (type === NotificationHttpAdapter.launchType.launchDate
      && !data.numberPeriod && !data.type) {
      res.attributes.payload['send_at'] = data.launchDateTime;
      res.attributes['notification_type'] = type;
      res.attributes.payload['new_status'] = 'active';
    }

    // type launchType.users_date_birth
    if (type === NotificationHttpAdapter.launchType.usersDateBirth
      && data.birthdayTime
      && !data.monthDay
    ) {
      res.attributes['notification_type'] = NotificationHttpAdapter.launchType.users_date_birth;
      res.attributes['segment'] = 'this_day';
      res.attributes.payload['send_at'] = data.birthdayTime;
    }

    // type launchType.users_date_birth
    if (
      type === NotificationHttpAdapter.launchType.usersMonthBirth
      && data.birthdayTime
      && data.monthDay
    ) {
      res.attributes['notification_type'] = NotificationHttpAdapter.launchType.users_month_birth;
      res.attributes['segment'] = 'this_month';
      res.attributes.payload['send_at'] = data.birthdayTime;
      res.attributes.payload['on_day'] = data.monthDay;
    }

    if (type === NotificationHttpAdapter.launchType.campaignNotCompleted) {
      res.attributes['notification_type'] = data.sentType;
      res.attributes.payload['send_at'] = data.time;
      res.attributes.payload['send_on'] = {
        period: data.numberPeriod,
        units: data.type
      };
    }

    if (data.id) {
      res['id'] = data.id;
    }

    return res;
  }

  public static handlerTransformNotifications(value: IJsonApiItem<IWNotificationAttributes>): ICampaignNotificationGroup {
    const notificationType = value.attributes.notification_type;
    if (notificationType === NotificationHttpAdapter.launchType.launchDate
      && value.attributes.payload.send_on
      && value.attributes.payload.send_on.period
      && value.attributes.payload.send_on.units) {
      return NotificationHttpAdapter.transformCampaignEndsGroup(value);
    }

    if (notificationType === NotificationHttpAdapter.launchType.launchDate
      || notificationType === NotificationHttpAdapter.launchType.users_date_birth
      || notificationType === NotificationHttpAdapter.launchType.users_month_birth
    ) {
      return NotificationHttpAdapter.transformStatusUpdate(value);
    }

    if (notificationType === NotificationHttpAdapter.launchType.campaignNotCompleted) {
      return NotificationHttpAdapter.transformCampaignNotCompletedGroup(value);
    }
  }

  public static transformCampaignEndsGroup(notification: IJsonApiItem<IWNotificationAttributes>): ICampaignNotificationGroup {
    return {
      id: notification.id,
      sentType: notification.attributes.notification_type,
      channel: notification.attributes.channel,
      campaignId: notification.attributes.entity_id,
      numberPeriod: notification.attributes.payload.send_on.period,
      type: notification.attributes.payload.send_on.units,
      time: notification.attributes.payload.send_at,
      template: null,
      templateId: null,
    };
  }

  public static transformCampaignNotCompletedGroup(notification: IJsonApiItem<IWNotificationAttributes>): ICampaignNotificationGroup {
    return {
      id: notification.id,
      sentType: notification.attributes.notification_type,
      channel: notification.attributes.channel,
      campaignId: notification.attributes.entity_id,
      numberPeriod: notification.attributes.payload.send_on.period,
      type: notification.attributes.payload.send_on.units,
      time: notification.attributes.payload.send_at,
      template: null,
      templateId: null,
    };
  }

  public static transformStatusUpdate(notification: IJsonApiItem<IWNotificationAttributes>): ICampaignNotificationGroup {
    const result: ICampaignNotificationGroup = {
      id: notification.id,
      sentType: notification.attributes.notification_type,
      channel: notification.attributes.channel,
      campaignId: notification.attributes.entity_id,
      launchDateTime: null,
      birthdayTime: null,
      template: null,
      monthDay: null,
    };
    if (notification.attributes.notification_type === NotificationHttpAdapter.launchType.launchDate) {
      result['launchDateTime'] = notification.attributes.payload.send_at;
    }

    if (notification.attributes.notification_type === NotificationHttpAdapter.launchType.users_date_birth) {
      if (notification.attributes.segment === 'this_day') {
        result['sentType'] = NotificationHttpAdapter.launchType.usersDateBirth;
        result['birthdayTime'] = notification.attributes.payload.send_at;
      }
      if (notification.attributes.segment === 'this_month') {
        result['sentType'] = NotificationHttpAdapter.launchType.usersMonthBirth;
        result['birthdayTime'] = notification.attributes.payload.send_at;
        result['monthDay'] = notification.attributes.payload.on_day;
      }
    }
    return result;
  }

  public static transformTemplate(data: any): ITemplate {
    return {
      message: data.attributes.content,
      templateId: data.id
    };
  }

  public static transformToChannelForm(data: any[]): Partial<IChannel> {
    const channelForm = {
      [NotificationHttpAdapter.notificationsFormGroups.onCampaignLaunch]: [],
      [NotificationHttpAdapter.notificationsFormGroups.campaignNotCompleted]: [],
      [NotificationHttpAdapter.notificationsFormGroups.beforeCampaignEnds]: []
    };
    data.forEach((item) => {
      channelForm['sms'] = true;
      const type = item.sentType;
      if (type === NotificationHttpAdapter.launchType.launchDate
        && item.type && item.time) {
        channelForm[NotificationHttpAdapter.notificationsFormGroups.beforeCampaignEnds]
          .push(item);
        return;
      }
      if (type === NotificationHttpAdapter.launchType.launchDate
        || type === NotificationHttpAdapter.launchType.usersDateBirth
        || type === NotificationHttpAdapter.launchType.usersMonthBirth) {
        channelForm[NotificationHttpAdapter.notificationsFormGroups.onCampaignLaunch]
          .push(item);
        return;
      }
      if (type === NotificationHttpAdapter.launchType.campaignNotCompleted) {
        channelForm[NotificationHttpAdapter.notificationsFormGroups.campaignNotCompleted]
          .push(item);
        return;
      }
    });

    return channelForm;
  }
}
