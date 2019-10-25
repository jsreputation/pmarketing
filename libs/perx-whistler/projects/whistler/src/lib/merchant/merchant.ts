
export interface IMerchant {
    id?: string;
    name: string;
    type?: string;
    description: string;
    urn?: string;
    created_at?: string;
    updated_at?: string;
    properties: {
        logo_image?: string;
        country_code?: string;
        phone: string;
        address: string;
        city: string;
        state: string;
        postal_code: string;
        weblink: string;
    };
    branches?: any;
}

export interface IMerchantBranchApi {
    name: string;
    properties: {
        phone: string;
        address: string;
    };
}
