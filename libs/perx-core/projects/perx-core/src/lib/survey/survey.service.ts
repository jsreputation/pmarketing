import { Observable } from 'rxjs';
import { IAnswer } from './models/survey.model';

export abstract class SurveyService {
  public abstract getSurvey(id: number): Observable<any>;

  public abstract postResponse(campaignId: string): Observable<void>;

  public abstract postAnswers(answer: IAnswer[]): Observable<void>;
}
