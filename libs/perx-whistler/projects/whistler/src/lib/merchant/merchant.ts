
export interface IMerchant {
    urn: string;
    created_at: string;
    updated_at: string;
    name: string;
    description: string;
    properties: {
        country_code?: string;
        logo_image?: string
    };
}

export interface IMerchantBranchApi {
    name: string;
    properties: {
        phone: string;
        address: string;
    };
}
export interface IMerchantApi {
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
