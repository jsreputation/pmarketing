import { Injectable } from '@angular/core';
import { SurveyHttpService } from '@cl-core/http-services/survey-http.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private surveyHttp: SurveyHttpService) { }

  public getSurveyQuestionType(): Observable<IEngagementType[]> {
    return this.surveyHttp.getQuestionType()
      .pipe(
        map(res => (res as IEngagementType[]))
      );
  }
}
