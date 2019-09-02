import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILocation } from './ilocation';

@Injectable({
  providedIn: 'root'
})
export abstract class LocationsService {
  public abstract getAll(tags: string[] | undefined): Observable<ILocation[]>;

  public abstract getLocations(page: number | undefined, pageSize: number | undefined, tags: string[] | undefined): Observable<ILocation[]>;

  public abstract getTags(): Observable<string[]>;

  public abstract getFromMerchant(merchantId: number): Observable<ILocation[]>;
}
