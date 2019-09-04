import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { Observable } from 'rxjs';
import { GeneralStaticDataService } from '@perx/core';

@Injectable({
  providedIn: 'root'
})
export class SurveyHttpService {

  constructor(private http: HttpClient,
              private generalStaticDataService: GeneralStaticDataService) {

  }

  public getQuestionType(): Observable<any> {
    return this.http.get('assets/actives/engagement-question/question-type.json');
  }

  public getCountriesList(): Observable<any> {
    // return this.http.get('assets/actives/apac-phone-prefix-list/phone-list.json');
    return this.generalStaticDataService.getCountriesList();
  }

  public getSurveyData(): Observable<{
    background: IGraphic[],
    cardBackground: IGraphic[]
  }> {
    return this.http.get<any>('assets/actives/survey/survey-data.json');
  }

  public getSurvey(id: string): Observable<any> {
    return this.http.get<any>(ApiConfig.engagementsPath + 'survey/' + id);
  }

  public createSurvey(data: any): Observable<any> {
    return this.http.post<any>(ApiConfig.engagementsPath, data);
  }

  public updateSurvey(id: string, data: any): Observable<any> {
    return this.http.patch<any>(ApiConfig.engagementsPath + 'survey/' + id, data);
  }
}
