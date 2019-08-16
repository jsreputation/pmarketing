import {Observable, of} from 'rxjs';
import {ILocation} from './ilocation';

export const sortByDistance =
  (position: Observable<Position>, locations: Observable<ILocation[]>, inc: boolean): Observable<ILocation[]> => {

    let currentPos: { lat: number, lng: number };
    let locationsList: ILocation[];
    const R = 6371e3; // radius of the earth
    const pi = Math.PI;

    position.subscribe(data => {
      return currentPos = {
        lat: data.coords.latitude,
        lng: data.coords.longitude
      };
    });

    locations.subscribe(data => {
      locationsList = data.map((row: ILocation) => {
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
      locationsList.sort((loc1, loc2) => {
        if (inc) {
          return loc1.distance - loc2.distance;
        }
        return loc2.distance - loc1.distance;
      });
    });
    return of(locationsList);
  };
