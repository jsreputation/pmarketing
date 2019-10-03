declare interface IMerchantApi {
  id?: string;
  name: string;
  type?: string;
  description: string;
  properties: {
    logo_image: string;
    country_code: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    postal_code: string;
    weblink: string;
  };
  branches?: any;
}
