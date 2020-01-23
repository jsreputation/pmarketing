import { WRedemptionType } from '@perx/whistler';

export interface IRewardEntityValidityPeriodForm {
  startDate?: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;
  disabledEndDate: boolean;
}

export interface IRewardVoucherForm {
  voucherCode?: {
    type?: string;
    singleCode?: {
      code?: string;
    };
    uniqueGeneratedCode?: {
      prefix?: string;
      codeFormat?: any;
      length?: number;
    };
  };
  voucherValidity: {
    type: string;
    period?: IRewardEntityValidityPeriodForm;
    issuanceDate: {
      times?: string;
      duration?: string;
    };
  };
}

export interface IRewardEntityForm {
  id?: string;
  name: string;
  loyalties?: ILoyaltyFormGroup[];
  displayProperties?: any;
  rewardInfo: {
    image: string;
    rewardType: string;
    category: string;
    redemptionType: WRedemptionType;
    cost: number;
    description: string;
    termsAndCondition: string;
    tags?: string[];
    merchantId: string | null;
    currency?: string;
  };
  vouchers?: IRewardVoucherForm;
}