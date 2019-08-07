import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyHttpService {

  constructor(private http: HttpClient) { }

  public getQuestionType(): Observable<any> {
    return this.http.get('assets/actives/engagement-question/question-type.json');
  }

  public getCountriesList(): Observable<any> {
    return this.http.get('assets/actives/apac-phone-prefix-list/phone-list.json');
  }

  public getSurveyData(): Observable<{
    background: IGraphic[],
    cardBackground: IGraphic[]
  }> {
    return this.http.get<any>('assets/actives/survey/survey-data.json');
  }
}
