import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILocation } from './ilocation';

@Injectable({
  providedIn: 'root'
})
export abstract class LocationsService {
  public abstract getAllLocations(tags?: string[]): Observable<ILocation[]>;

  public abstract getLocations(page?: number, tags?: string[]): Observable<ILocation[]>;

  public abstract getTags(): Observable<string[]>;

  public abstract getFromMerchant(merchantId: number, page?: number): Observable<ILocation[]>;
}
