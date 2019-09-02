import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { ISurvey } from './models/survey.model';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  // @ts-ignore
  public getSurvey(id: string): Observable<ISurvey> {
    return throwError('Not implement yet');
  }
}
