import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ISurvey } from './models/survey.model';
import { Config } from '../config/config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  // @ts-ignore
  constructor(
    // @ts-ignore
    private http: HttpClient,
    // @ts-ignore
    config: Config,
  ) {
  }
  // @ts-ignore
  public getSurvey(id: number): Observable<ISurvey> {
    return throwError('Not implement yet');
  }
}
