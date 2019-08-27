import { Injectable } from '@angular/core';
import { SettingsHttpService } from '@cl-core/http-services/settings-http.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITableService } from '@cl-shared/table/data-source/table-service-interface';
import { IAMUser } from '@cl-core/models/settings/IAMUser.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService implements ITableService {

  constructor(private settingsHttpService: SettingsHttpService,
              private fb: FormBuilder) {
  }

  public getTimeZone(): Observable<ITimeZone[]> {
    return this.settingsHttpService.getTimeZone();
  }

  public getCurrency(): Observable<Currency[]> {
    return this.settingsHttpService.getCurrency()
      .pipe(
        map((data: Currency[]) => {
          return data.sort((a, b) => {
            const nameA = a.country.toLowerCase();
            const nameB = b.country.toLowerCase();
            return (nameA < nameB) ? -1 : 1;
          });
        })
      );
  }

  public getRoles(): Observable<any[]> {
    return this.settingsHttpService.getRoles();
  }

  public getRolesOptions(): Observable<any[]> {
    return this.settingsHttpService.getRolesOptions();
  }

  public getFormBranding(): FormGroup {
    return this.createFormBranding();
  }

  public getAllCredential(data: any): any {
    return this.settingsHttpService.getAllCredential(data);
  }

  private createFormBranding(): FormGroup {
    return this.fb.group({
      style: [null], font: [null],
      primaryColor: ['#0f69af'],
      secondaryColor: ['#1cd6ff'],
      headerNavbarColor: [null],
      logo: [null, [Validators.required]],
      logoType: ['image'],
      button: [null]
    });
  }

  public getTableData(params: any): Observable<any> {
    return this.settingsHttpService.getAllIMAUsers(params)
      .pipe(
        map((res: any) => {
          return res.data.map((item) => {
            const user = new IAMUser(item);
            if (res.included && res.included.length) {
              for (let i = 0; i <= res.included.length - 1; i++) {
                if (user.relationships_groups_id === res.included[i].id) {
                  user.role = res.included[i].attributes.name;
                  break;
                }
              }
            }
            return user;
          });
        }
      ));
  }

  public inviteNewUser(data: any): Observable<any> {
    return this.settingsHttpService.inviteNewUser(data);
  }

  public patchUser(data: any, id: string): Observable<any> {
    return this.settingsHttpService.patchUser(data, id);
  }

  public deleteUser(id: string): Observable<any> {
    return this.settingsHttpService.deleteUser(id);
  }

  public getAllGroups(): Observable<any> {
    return this.settingsHttpService.getAllGroups()
      .pipe(
        map(res => res.data)
      );
  }

}
