export interface ILocation {
    merchantId?: number;
    merchantName?: string;
    locationId?: number;
    name: string;
    tags?: string[];
    address?: string;
    address2?: string;
    address3?: string;
    latitude: number;
    longitude: number;
    phone?: string;
    distance?: number;
}
