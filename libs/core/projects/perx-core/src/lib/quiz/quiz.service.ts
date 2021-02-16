import { Observable } from 'rxjs';
import { IPayload, IQAnswer, IQuiz } from './models/quiz.model';

export interface IAnswerResult {
  hasOutcomes: boolean;
  points: number;
}

export interface IQQuestion<T = any> {
  id: string;
  question: {
    text: string,
    image?: {
      type: string,
      value: {
        section: string,
        filename: string,
        image_id: number,
        image_url: string;
      }
    }};
  description?: {text: string};
  required: boolean;
  payload: IPayload;
  answer?: any;
  meta?: T;
}

export abstract class QuizService {
  public abstract getQuizFromCampaign(id: number, lang?: string): Observable<IQuiz>;
  public abstract getMove(gameId: number): Observable<{ moveId: number }>;
  public abstract postQuizAnswer(answers: IQAnswer, moveId: number): Observable<IAnswerResult>;
  public abstract postFinalQuizAnswer(moveId: number): Observable<any>;
}
