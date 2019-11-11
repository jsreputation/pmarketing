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
    outletId: number;
    outletName: string;
    outletAddress1: string;
    outletAddress2: string;
    outletAddress3: string;
    postalCode: string;
    tel: string;
    coordinates: { lat: number, lng: number, distance?: number, unitOfMeasure: string };
    tags?: ITag[];
}

export interface IMeta {
  /* eslint-disable */
    count?: number;
    size?: number;
    total_pages?: number;
    page?: number;
}
/* eslint-enable */
