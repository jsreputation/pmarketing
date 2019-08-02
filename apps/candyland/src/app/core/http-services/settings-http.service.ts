import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsHttpService {

  constructor(private http: HttpClient) { }

  public getTimeZone(): Observable<any> {
    return this.http.get('assets/actives/settings/time-zone.json');
  }

  public getCurrency(): Observable<any> {
    return this.http.get('assets/actives/settings/currency.json');
  }
}
