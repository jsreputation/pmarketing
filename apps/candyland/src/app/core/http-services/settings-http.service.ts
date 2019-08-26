import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigPathService } from '@cl-core/services';

@Injectable({
  providedIn: 'root'
})
export class SettingsHttpService {

  constructor(private http: HttpClient) { }

  public getTimeZone(): Observable<ITimeZone[]> {
    return this.http.get<ITimeZone[]>('assets/actives/settings/time-zone.json');
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
    console.log('http params', params);
    return this.http.get(ConfigPathService.getAllCredentialPath, params);
  }

  public getAllIMAUsers(params: HttpParams): Observable<any> {
    return this.http.get(ConfigPathService.IAMUsersPath, {params});
  }

  public inviteNewUser(body): Observable<any> {
    return this.http.post(ConfigPathService.IAMUsersPath, {data: body});
  }

  public patchUser(patchValue, id: string): Observable<any> {
    return this.http.patch(`${ConfigPathService.IAMUsersPath}/${id}`, {data: patchValue});
  }

  public deleteUser(id: string): Observable<any> {
    return this.http.delete(`${ConfigPathService.IAMUsersPath}/${id}`);
  }

  public getAllGroups(): Observable<any> {
    return this.http.get(ConfigPathService.IAMGroupsPath);
  }
}
