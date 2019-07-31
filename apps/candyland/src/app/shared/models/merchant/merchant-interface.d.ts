declare interface IMerchantFull extends IMerchant {
  logo: string;
  description: string;
  countryCode: string;
  phone: string;
  address: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  weblink: string;
  branches: IBranch[];
}

declare interface IBranch {
  name: string;
  address: string;
  contactNumber: string;

}
