import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILocation } from './ilocation';

@Injectable({
  providedIn: 'root'
})
export abstract class LocationsService {
  public abstract getAll(tags?: string[]): Observable<ILocation[]>;

  public abstract getLocations(page?: number, pageSize?: number, tags?: string[]): Observable<ILocation[]>;

  public abstract getTags(): Observable<string[]>;

  public abstract getFromMerchant(merchantId: number): Observable<ILocation[]>;
}
