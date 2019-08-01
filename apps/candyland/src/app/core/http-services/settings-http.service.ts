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

  public getRoles(): Observable<any> {
    return this.http.get('assets/actives/settings/roles.json');
  }

  public getRolesOptions(): Observable<any> {
    return this.http.get<OptionConfig[]>('assets/actives/settings/roles-options.json');
  }
}
