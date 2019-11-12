export enum WAssignedStatus {
  issued = 'issued',
  assigned = 'assigned'
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

export interface IWAssignRequestAttributes {
  assigned_to_id?: string;
  source_id: string;
  source_type: string;
}
