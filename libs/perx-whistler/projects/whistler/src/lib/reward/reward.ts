export enum WRedemptionType {
  promoCode = 'Promo Code',
  qrCode = 'QR Code',
  merchantPin = 'Merchant PIN',
  barCode = 'Bar Code'
}

export interface IWRewardEntityAttributes {
  urn?: string;
  created_at?: string;
  updated_at?: string;
  name: string;
  image_url?: string;
  reward_type: string;
  category: string;
  redemption_type: WRedemptionType;
  cost_of_reward: number;
  tags: string[];
  currency?: string;
  description?: string;
  terms_conditions?: string;
  display_properties?: {
    voucher_properties?: {
      code_type: string,
      code?: string,
      prefix?: string;
      length?: number;
      format_type?: string;
      validity: {
        type: string;
        start_date?: string;
        end_date?: string;
        times?: string;
        duration?: string;
      }
    },
    merchantPinText?: IWProperties;
    rewardSuccessPopUp?: IWProperties;
    codeInstructionsText?: IWProperties;
    errorPopUp?: IWProperties;
    CTAButtonTxt?: string;
    redemption_text?: string;
    loyalties: any;
  };
  organization_id?: string;
}

export interface IWMetaData {
  totalPages?: number;
  currentPage?: number;
}

interface IWProperties {
  headLine?: string;
  subHeadLine?: string;
  imageURL?: string;
  buttonTxt?: string;
}

export interface IWTierRewardCostsAttributes {
  urn?: string;
  created_at?: string;
  updated_at?: string;
  apply_tier_discout: boolean;
  tier_value: string;
  tier_id: number;
  tier_type: string;
  entity_id: number;
}
