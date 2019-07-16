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
}
