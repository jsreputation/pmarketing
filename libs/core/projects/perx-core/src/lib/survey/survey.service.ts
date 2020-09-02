import { Observable } from 'rxjs';
import { IAnswer } from './models/survey.model';

export abstract class SurveyService {
  // surveys will be fetched from home page using getCampaigns type survey, dont double fetch just to
  // pass down the id like quiz
  // would be passed down something that is directly returned from api
  // will do the other methods after confirm with sergey, shuld be similar to whistler post and patch answer
  public abstract getSurveyFromCampaign(id: number): Observable<any>;
  public abstract postSurveyAnswer(answers: IAnswer[], campaignId: number, surveyId: number): Observable<any>;
}
