import { Observable } from 'rxjs';
import { IQAnswer, IQuiz } from './models/quiz.model';

export interface IAnswerResult {
  hasOutcomes: boolean;
  points: number;
}

export abstract class QuizService {
  public abstract getQuizFromCampaign(id: number): Observable<IQuiz>;
  public abstract getMove(gameId: number): Observable<{ moveId: number }>;
  public abstract postQuizAnswer(answers: IQAnswer, moveId: number): Observable<IAnswerResult>;
}
