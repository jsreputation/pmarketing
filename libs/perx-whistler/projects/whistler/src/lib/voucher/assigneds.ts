export enum WAssignedStatus {
  issued = 'issued',
  assigned = 'assigned',
  reserved = 'reserved',
  expired = 'expired',
}

export interface IWAssignedAttributes {
  id?: number;
  assigned_to_id: number;
  value: string;
  created_at: string;
  valid_to: string;
  source_id: number;
  source_type: string;
  valid_from: string;
  status: WAssignedStatus;
  updated_at: string;
  urn: string;
}

export interface IWPurchaseAttributes {
  loyalty_card_id: number;
  reward_entity_id: number;
  voucher: IWAssignedAttributes;
}

export interface IWAssignRequestAttributes {
  assigned_to_id?: string;
  source_id: string;
  source_type: string;
}
