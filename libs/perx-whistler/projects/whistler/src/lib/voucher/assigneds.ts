export enum WAssignedStatus {
  issued = 'issued',
  assigned = 'assigned',
  reserved = 'reserved',
  expired = 'expired',
}

export interface IWAssignedAttributes {
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
  voucher: IWPurchaseAssignedAttributes;
}

export interface IWPurchaseAssignedAttributes {
  id: number;
  code_id: number;
  assigned_to_id: number;
  consumed_at: string | null;
  status: WAssignedStatus;
  valid_from: string;
  valid_to: string;
  urn: string;
  updated_at: string;
  created_at: string;
  value: string;
}

export interface IWAssignRequestAttributes {
  assigned_to_id?: string;
  source_id: string;
  source_type: string;
}
