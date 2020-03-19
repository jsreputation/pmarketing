import { Observable } from 'rxjs';
import { IQAnswer, IQuiz } from './models/quiz.model';

export abstract class QuizService {
  public abstract getQuizFromCampaign(id: number): Observable<IQuiz>;
  public abstract patchQuizAnswer(answers: IQAnswer[], campaignId: number, quizId: number): Observable<{ hasOutcomes: boolean }>;
  public abstract postQuizAnswer(answers: IQAnswer[], campaignId: number, surveyId: number): Observable<{ hasOutcomes: boolean }>;
}
