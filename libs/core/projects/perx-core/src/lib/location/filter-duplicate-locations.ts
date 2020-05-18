import { ILocation } from './ilocation';

export const filterDuplicateLocations = (locations: ILocation[]): ILocation[] =>
  locations.filter((item: ILocation, i: number, array: ILocation[]) =>
    array.map(mapObj => mapObj.locationId).indexOf(item.locationId) === i);
