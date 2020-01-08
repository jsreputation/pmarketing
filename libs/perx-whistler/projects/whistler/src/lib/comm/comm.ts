export interface IWCommTemplateAttributes {
  name?: number;
  description?: string;
  content: any;
  status?: string;
}

export interface IWCommEventAttributes {
  send_at: string;
  provider_id?: number;
  owner_id?: number;
  owner_type?: string;
  template_id?: number;
  channel: string;
  target_id?: number;
  target_type?: string;
  name?: string;
}

export enum WMessageChannel {
  sms = 'sms'
}

export interface IWCommMessageAttributes {
  urn?: string;
  created_at?: string;
  updated_at?: string;
  from: string;
  to: string;
  body: string;
  provider_id: number;
  owner_id?: null;
  owner_type?: null;
  channel: WMessageChannel;
}
