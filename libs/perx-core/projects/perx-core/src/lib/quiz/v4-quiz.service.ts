import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { oc } from 'ts-optchain';
import { Config } from '../config/config';
import { Asset } from '../game/v4-game.service';
import { IQAnswer, IQQuestion, IQuiz, QuizMode, QuizQuestionType, IQuizOutcome } from './models/quiz.model';
import { IAnswerResult, QuizService } from './quiz.service';

const enum V4QuizMode {
  basic = 'basic',
  swipe = 'swipe',
  elimination = 'elimination'
}

export interface QuizDisplayProperties {
  title: string;
  questions: {
    question: { [k: string]: string };
    description: { [k: string]: string };
    id: string;
    required: boolean;
    payload: any;
  }[];
  landing_page: {
    body: string;
    media?: { youtube?: string; };
    heading: string;
    button_text: string;
    sub_heading: string;
  };
  background_image?: Asset;
  card_image?: Asset;
  quiz_interaction: V4QuizMode;
  header?: {
    value?: {
      title?: string;
      description?: string;
    };
  };
  headline_text?: string;
  body_text?: string;
  button_text?: string;
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
  answer_ids: (string | number)[];
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

  public getQuizFromCampaign(campaignId: number, lang: string = 'en'): Observable<IQuiz> {
    return this.http.get<V4GamesResponse>(`${this.baseUrl}/v4/campaigns/${campaignId}/games`)
      .pipe(
        map((res) => res.data),
        map((games: V4Game[]) => {
          if (games.length === 0) {
            throw new Error(`No available game for this campaign #${campaignId}`);
          }
          return games[0];
        }),
        map((game: V4Game): IQuiz => {
          const mode = V4QuizService.v2Mode2Mode(game.display_properties.quiz_interaction);
          const questions: IQQuestion[] = game.display_properties.questions.map(question => {
            const payload = { ...question.payload };
            if (payload.type === 'select') {
              payload.choices = payload.choices.map(choice => ({
                title: choice.answer[lang] || choice.answer.en,
                id: choice.answer_id
              }));
              if (mode === QuizMode.swipe) {
                payload.type = QuizQuestionType.swipeSelect;
              }
              if (mode === QuizMode.elimination) {
                payload.type = QuizQuestionType.swipeDelete;
              }
            }

            return {
              id: question.id,
              question: question.question[lang] || question.question.en,
              description: question.description ? question.description[lang] : oc(question).description.en(),
              required: question.required,
              payload
            };
          });
          let outcome: IQuizOutcome | undefined;
          if (oc(game).display_properties.headline_text() ||
            oc(game).display_properties.body_text() ||
            oc(game).display_properties.button_text()) {
            outcome = {
              title: oc(game).display_properties.headline_text(''),
              subTitle: oc(game).display_properties.body_text(''),
              button: oc(game).display_properties.button_text('')
            };
          }
          return {
            id: game.id,
            title: oc(game).display_properties.header.value.title(''),
            subTitle: oc(game).display_properties.header.value.description(),
            results: {
              outcome
            },
            questions,
            mode,
            backgroundImgUrl: oc(game).display_properties.background_image.value.image_url(),
            cardBackgroundImgUrl: oc(game).display_properties.card_image.value.image_url()
          };
        })
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
        answer_ids: answer.content,
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

  private static v2Mode2Mode(mode: V4QuizMode): QuizMode {
    if (mode === V4QuizMode.swipe) {
      return QuizMode.swipe;
    }
    if (mode === V4QuizMode.elimination) {
      return QuizMode.elimination;
    }
    return QuizMode.basic;
  }
}
