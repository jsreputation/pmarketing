export enum AssignedStatus {
  issued = 'issued',
  assigned = 'assigned'
}

export interface IAssignedAttributes {
  assigned_to_id: number;
  value: string;
  created_at: string;
  valid_to: string;
  source_id: number;
  source_type: string;
  valid_from: string;
  status: AssignedStatus;
  updated_at: string;
  urn: string;
  display_properties?: {
    merchantPinText?: {
      headLine?: string,
      subHeadLine?: string,
    };
    rewardSuccessPopUp?: {
      headLine?: string,
      subHeadLine?: string,
      imageURL?: string,
    };
    codeInstructionsText?: {
      headLine?: string,
    };
    errorPopUp?: {
      headLine?: string,
      subHeadLine?: string,
      imageURL?: string,
    };
  };
}

export interface IAssignRequestAttributes {
  assigned_to_id?: string;
  source_id: string;
  source_type: string;
}
