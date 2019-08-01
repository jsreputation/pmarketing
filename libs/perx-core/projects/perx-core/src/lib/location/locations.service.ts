import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ILocation } from './ilocation';

@Injectable({
  providedIn: 'root'
})
export abstract class LocationsService {
  // @ts-ignore
  public getAll(tags: string[] = []): Observable<ILocation[]> {
    return throwError('not implemented yet');
  }

  public getTags(): Observable<string[]> {
    return throwError('not implemented yet');
  }
}
