export interface IMerchantForm {
  name: string;
  type?: string;
  id?: string;
  description: string;
  image: string;
  countryCode: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  weblink: string;
  branches?: any;
  deletedBranches?: any;
  createdAt: string;
}
