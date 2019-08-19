import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { ILocation } from './ilocation';

const countDistance = (latestPosition: Position, latestLocations: ILocation[]): ILocation[] => {
  const R = 6371e3; // radius of the earth
  const pi = Math.PI;

  const currentPos = {
    lat: latestPosition.coords.latitude,
    lng: latestPosition.coords.longitude
  };

  return latestLocations.map((row: ILocation) => {
    const posLatToRad = (currentPos.lat * (pi / 180));
    const locLatToRad = (row.latitude * (pi / 180));
    const dLat = (row.latitude - currentPos.lat) * (pi / 180);
    const dLon = (row.longitude - currentPos.lng) * (pi / 180);
    // use haversine formula
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(posLatToRad) * Math.cos(locLatToRad) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    row.distance = R * c;
    return row;
  });
};

export const sortByDistance =
  (position: Observable<Position>, locations: Observable<ILocation[]>, inc: boolean): Observable<ILocation[]> => {
    return combineLatest(position, locations)
      .pipe(
        map((stuffs: [Position, ILocation[]]) => {
          const latestPosition = stuffs[0];
          const latestLocations = stuffs[1];
          const locationsList = countDistance(latestPosition, latestLocations);

          locationsList.sort((loc1, loc2) => {
            if (inc) {
              return loc1.distance - loc2.distance;
            }
            return loc2.distance - loc1.distance;
          });
          return locationsList;
        })
      );
  };
