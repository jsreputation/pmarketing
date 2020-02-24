import { IMerchant } from './merchant-simple-interface';
import { IBranch } from './branch-interface';

export interface IMerchantFull extends IMerchant {
  description: string;
  countryCode: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  weblink: string;
  branches?: IBranch[];
}
