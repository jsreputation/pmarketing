import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from '@cl-core/api-config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SettingsHttpService {

  constructor(private http: HttpClient) { }

  private static compareTimeZone(a: ITimeZone, b: ITimeZone): number {
    const aN = SettingsHttpService.zone2Number(a.zone);
    const bN = SettingsHttpService.zone2Number(b.zone);
    return aN - bN;
  }

  private static zone2Number(z: string): number {
    const sign: string = z.substring(3, 4);
    const time: string = z.substring(4);
    const times: string[] = time.split(':');
    if (times.length !== 2) {
      throw new Error(`Invalid time zone ${z}`);
    }
    const hours = Number.parseInt(times[0], 10);
    const minutes = Number.parseInt(times[1], 10);
    return (hours + minutes / 60) * (sign === '+' ? 1 : -1);
  }

  public getTimeZone(): Observable<ITimeZone[]> {
    return this.http.get<ITimeZone[]>('assets/actives/settings/time-zone.json')
      .pipe(
        map((zones: ITimeZone[]) => zones.sort(SettingsHttpService.compareTimeZone))
      );
  }

  public getCurrency(): Observable<Currency[]> {
    return this.http.get<Currency[]>('assets/actives/settings/currency.json');
  }

  public getRoles(): Observable<any> {
    return this.http.get('assets/actives/settings/roles.json');
  }

  public getRolesOptions(): Observable<any> {
    return this.http.get<OptionConfig[]>('assets/actives/settings/roles-options.json');
  }

  public getAllCredential(params: any): Observable<any> {
    return this.http.get(ApiConfig.getAllCredentialPath, params);
  }

  public getAllIMAUsers(params: HttpParams): Observable<any> {
    return this.http.get(ApiConfig.IAMUsersPath, { params });
  }

  public inviteNewUser(body): Observable<any> {
    return this.http.post(ApiConfig.IAMUsersPath, { data: body });
  }

  public patchUser(patchValue, id: string): Observable<any> {
    return this.http.patch(`${ApiConfig.IAMUsersPath}/${id}`, { data: patchValue });
  }

  public deleteUser(id: string): Observable<any> {
    return this.http.delete(`${ApiConfig.IAMUsersPath}/${id}`);
  }

  public getAllGroups(): Observable<any> {
    return this.http.get(ApiConfig.IAMGroupsPath);
  }
}
