import { WMessageChannel } from '@perx/whistler/dist/whistler/lib/comm/comm';

export interface IComm {
  message?: string;
  schedule?: ISchedule;
  poolId?: string;
  channel?: string;
  eventId?: string;
  templateId?: string;
}

export interface ISchedule {
  sendDate: Date;
  sendTime: string;
  enableRecurrence?: boolean;
  recurrence?: {
    times: number;
    period: string;
    repeatOn: string[];
  };
}

export interface ICommMessage {
  id?: string;
  from: string;
  to?: string;
  recipientId?: number;
  providerId: number;
  message: string;
  sendDate?: Date | null;
  ownerId?: string | null;
  ownerType?: string | null;
  channel: WMessageChannel;
}
