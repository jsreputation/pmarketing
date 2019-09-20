export interface IMerchant {
    id: number;
    name: string;
    description?: string;
    website?: string;
    tags?: ITag[];
    images?: IImage[];
    outlets?: IOutlet[];
}

export interface ITag {
    id: number;
    name: string;
}

export interface IImage {
    type: string;
    url: string;
}

export interface IOutlet {
    outlet_id: number;
    outlet_name: string;
    outlet_address1: string;
    outlet_address2: string;
    outlet_address3: string;
    postal_code: string;
    tel: string;
    coordinates: { lat: number, lng: number, distance?: number, unit_of_measure: string };
    tags?: ITag[];
}

export interface IMeta {
    count?: number;
    size?: number;
    total_pages?: number;
    page?: number;
}
