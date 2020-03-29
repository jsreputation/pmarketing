import { Observable } from 'rxjs';
import { IQAnswer, IQuiz } from './models/quiz.model';

export abstract class QuizService {
  public abstract getQuizFromCampaign(id: number): Observable<IQuiz>;
  public abstract postQuizAnswer(answers: IQAnswer, moveId: number): Observable<{ hasOutcomes: boolean }>;
}
