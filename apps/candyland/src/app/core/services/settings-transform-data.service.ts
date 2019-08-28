import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsTransformDataService {
  // tslint:disable
  public transformInviteUser(data: any): any {
    const res = {
      type: 'users',
      attributes: {
        username: data.name,
        api: true,
        console: true,
        properties: {
          email: data.email
        }
      },
      relationships: {
        groups: {
          data: [{id: data.groups.id, type: data.groups.type}]
        }
      }
    };
    if (data.id) {
      res['id'] = data.id;
    }
    return res;
  }
}
