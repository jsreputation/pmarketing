// import { WhistlerITenant } from './../../utils/themes/themes.model';
import { HttpClient } from '@angular/common/http';
import { Config} from '../../config/config';
// import { ISurvey } from '../../survey/models/survey.model';
import { Observable  } from 'rxjs';
import { IFormsService } from './iforms.service';
import { Injectable } from '@angular/core';
// import { IJsonApiListPayload } from '../../jsonapi.payload';
import { pluck, map, tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WhistlerFormsService implements IFormsService {
  private baseUrl: string;
  private themeSettingEndpoint: string;
  // @ts-ignore
  constructor(private config: Config, private http: HttpClient) {
    if (!config.production) {
      this.themeSettingEndpoint = 'http://localhost:4000/themes';
    } else {
      this.themeSettingEndpoint = config.baseHref + 'themes';
    }
    this.baseUrl = config.apiHost as string;
  }

  public getSignupForm(): Observable<any> {
    const themesRequest: { url: string } = {
      url: location.host
    };
    console.log(this.http)
    return this.http.post(this.themeSettingEndpoint, themesRequest).pipe(
      pluck("data"),
      map(res => res[0]),
      pluck("id"),
      tap(res => console.log(res)),
      switchMap(res => this.http.get(`${this.baseUrl}/cognito/tenants/${res}`).pipe(
        pluck("data", "attributes", "properties")
      )),
      tap(res => console.log(res))
    )
  }
}
