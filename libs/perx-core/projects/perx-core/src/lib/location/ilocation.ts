export interface ILocation {
    merchantId?: number;
    locationId?: number;
    name: string;
    tags?: string[];
    address?: string;
    address2?: string;
    address3?: string;
    latitude: number;
    longitude: number;
    phone?: string;
}
