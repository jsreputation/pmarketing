import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { ILocation } from './ilocation';

const countDistance = (latestPosition: Position | null, latestLocations: ILocation[]): ILocation[] => {
  if (latestPosition === null) {
    latestLocations.forEach(loc => loc.distance = undefined);
    return latestLocations;
  }
  const R: number = 6371e3; // radius of the earth
  const pi: number = Math.PI;

  const lat: number = latestPosition.coords.latitude;
  const lng: number = latestPosition.coords.longitude;

  const posLatToRad: number = (lat * (pi / 180));

  return latestLocations.map((row: ILocation) => {
    if (row.latitude === null || row.longitude === null) {
      return row;
    }
    const locLatToRad = (row.latitude * (pi / 180));
    const dLat = (row.latitude - lat) * (pi / 180);
    const dLon = (row.longitude - lng) * (pi / 180);
    // use haversine formula
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(posLatToRad) * Math.cos(locLatToRad) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    row.distance = R * c;
    return row;
  });
};

export const sortByDistance = (
  position: Observable<Position>,
  locations: Observable<ILocation[]>,
  inc: boolean
): Observable<ILocation[]> => combineLatest(position, locations)
  .pipe(
    map(([latestPosition, latestLocations]: [Position, ILocation[]]) => {
      const locationsList = countDistance(latestPosition, latestLocations);

      return locationsList.sort((loc1, loc2) => {
        let dist;
        if (!loc1.distance) {
          dist = loc2.distance ? 1 : 0;
        } else if (!loc2.distance) {
          dist = -1;
        } else {
          dist = loc1.distance - loc2.distance;
        }
        return inc ? dist : -dist;
      });
    })
  );
