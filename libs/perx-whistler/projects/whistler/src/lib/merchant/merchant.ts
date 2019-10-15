
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
