import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudiencesTransformDataService {
  // tslint:disable
  public transformCreateUser(data: any): any {
    const res = {
      type: 'users',
      attributes: {
        title: 'Test' + data.firstName + data.lastName,
        first_name: data.firstName,
        last_name: data.lastName,
        phone_number: data.phone,
        email_address: data.email,
        primary_identifier: data.firstName + 'identifier',
        properties: ''
      }
    };
    if (data.id) {
      res['id'] = data.id;
    }
    return res;
  }
}
