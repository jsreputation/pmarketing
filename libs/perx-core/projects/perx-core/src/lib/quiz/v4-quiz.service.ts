import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Config } from '../config/config';
import { IQAnswer, IQuiz } from './models/quiz.model';
import { QuizService, IAnswerResult } from './quiz.service';
import { oc } from 'ts-optchain';

export interface QuizDisplayProperties {
  title: string;
  questions: any[];
  landing_page: {
    body: string;
    media?: { youtube?: string; };
    heading: string;
    button_text: string;
    sub_heading: string;
  };
}

interface V4NextMoveResponse {
  data: {
    acquired_via: string;
    id: number;
    user_account_id: number;
    state: string;
    campaign_id: number;
    game_id: number;
    outcomes: any[],
    reason: null;
    issued_at: string;
    created_by_type: string;
    created_by_id: number;
    expiry_date: null | string;
    answers: any[];
  };
}

interface V4QuizAnswerRequest {
  answer: V4AnswerRequest;
}

interface V4AnswerRequest {
  question_id: string;
  answer: (string | number)[];
  time_taken: number;
}

interface V4AnswerResponse extends V4AnswerRequest {
  is_correct: boolean;
  score: number;
}

interface V4QuizAnswerResponse {
  data: {
    id: number;
    user_account_id: 321;
    state: string;
    campaign_id: number;
    game_id: number;
    // move_params: {
    answers: V4AnswerResponse[];
    // };
    outcomes: any[];
  };
}

interface V4Game {
  id: number;
  user_account_id: number;
  state: null;
  campaign_id: number;
  game_type: string;
  display_properties: QuizDisplayProperties;
  number_of_tries: number;
}

interface V4GamesResponse {
  data: V4Game[];
  meta: {
    count: number;
    size: number;
    page: number;
    current_page: number;
    per_page: number;
    prev_page: null;
    next_page: null;
    total_pages: number;
    total_count: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class V4QuizService implements QuizService {
  private baseUrl: string;

  constructor(
    private http: HttpClient,
    config: Config
  ) {
    this.baseUrl = config.apiHost || '';
  }

  public getQuizFromCampaign(campaignId: number): Observable<IQuiz> {
    return this.http.get<V4GamesResponse>(`${this.baseUrl}/v4/campaigns/${campaignId}/games`)
      .pipe(
        map((res) => res.data),
        filter((games: V4Game[]) => games.length > 0),
        map((games: V4Game[]) => games[0]),
        map((game: V4Game): IQuiz => ({
          id: game.id,
          title: game.display_properties.title,
          results: {},
          questions: game.display_properties.questions
        }))
      );
  }

  public getMove(gameId: number): Observable<{ moveId: number; }> {
    return this.http.post<V4NextMoveResponse>(`${this.baseUrl}/v4/games/${gameId}/next_move`, null)
      .pipe(
        map((api) => ({ moveId: api.data.id }))
      );
  }

  public postQuizAnswer(answer: IQAnswer, moveId: number): Observable<IAnswerResult> {
    const payload: V4QuizAnswerRequest = {
      answer: {
        question_id: answer.questionId,
        answer: answer.content,
        time_taken: answer.timeTaken || -1
      }
    };
    return this.http.put<V4QuizAnswerResponse>(`${this.baseUrl}/v4/game_transactions/${moveId}/answer_quiz`, payload)
      .pipe(map(res => {
        const result = res.data.answers.find(ans => answer.questionId === ans.question_id);
        return {
          hasOutcomes: res.data.outcomes.length > 0,
          points: oc(result).score() || 0
        };
      }));
  }
}
