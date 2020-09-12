import { Observable } from 'rxjs';
import { IAnswer, ISurvey } from './models/survey.model';
import { IJsonApiItemPayload, IWSurveyEngagementAttributes } from '@perxtech/whistler';

export abstract class SurveyService {
  public WSurveyToSurvey?(survey: IJsonApiItemPayload<Partial<IWSurveyEngagementAttributes>>): ISurvey;
  public abstract getSurveyFromCampaign(id: number): Observable<ISurvey>;
  public abstract postSurveyAnswer(answer: IAnswer, moveId: number): Observable<{
    hasOutcomes: boolean
  }>;
  public abstract getMoveId(gameId: number): Observable<number>;
}
