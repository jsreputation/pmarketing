export interface IWNotificationAttributes {
  notification_type: string;
  payload: {
    send_at?: any;
    on_day?: any;
    units?: string;
    period?: any;
    send_on?: any;
  };
  segment: any;
  template_id: string;
  provider_id: number;
  channel: string;
  entity_id: string;
}
