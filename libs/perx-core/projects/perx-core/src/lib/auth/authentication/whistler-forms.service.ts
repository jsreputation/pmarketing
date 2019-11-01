import { ISurvey } from './../../survey/models/survey.model';
import { HttpClient } from '@angular/common/http';
import { Config} from '../../config/config';
// import { ISurvey } from '../../survey/models/survey.model';
import { Observable  } from 'rxjs';
import { IFormsService } from './iforms.service';
import { Injectable } from '@angular/core';
// import { IJsonApiListPayload } from '../../jsonapi.payload';
import { pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WhistlerFormsService implements IFormsService {
  private baseUrl: string;
  // @ts-ignore
  constructor(private config: Config, private http: HttpClient) {
    this.baseUrl = config.apiHost as string;
  }

  public getSignupForm(): Observable<ISurvey> {
    return (this.http.get(`${this.baseUrl}/cognito/tenants/1`).pipe(
        pluck("data", "attributes", "properties")
    ) as Observable<ISurvey>);
  }

  public postUser(): Observable<unknown> {
    // to be included
    return;
  }
}
