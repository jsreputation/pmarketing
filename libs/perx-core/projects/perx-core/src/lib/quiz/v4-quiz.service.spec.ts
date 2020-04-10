import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ConfigModule } from '../config/config.module';
import { IQuiz } from './models/quiz.model';
import { V4QuizService } from './v4-quiz.service';

describe('V4QuizService', () => {
  let httpClientSpy: Partial<HttpClient>;
  let service: V4QuizService;
  const noQuestionMockQuiz = {
    id: 2,
    user_account_id: 3,
    state: null,
    campaign_id: 4,
    game_type: 'quiz',
    display_properties: {
      header: { value: { title: 'yo' } },
      questions: []
    },
    number_of_tries: 100
  };

  const environment = {
    apiHost: 'https://blabla',
    production: false,
    isWhistler: false,
    preAuth: false,
    baseHref: '/'
  };
  let getFnSpy: jest.Mock;
  let putFnMock: jest.Mock;

  beforeEach(() => {
    getFnSpy = jest.fn();
    putFnMock = jest.fn();
    httpClientSpy = { get: getFnSpy, put: putFnMock };
    TestBed.configureTestingModule({
      imports: [
        ConfigModule.forRoot({ ...environment })
      ],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    });
    service = TestBed.get(V4QuizService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a quiz from a campaign id', (done: jest.DoneCallback) => {
    const res = {
      data: [
        noQuestionMockQuiz
      ],
    };
    getFnSpy.mockReturnValue(of(res));

    service.getQuizFromCampaign(42)
      .subscribe(
        (s: IQuiz) => {
          expect(s.questions.length).toBe(0);
          expect(s.title).toBe('yo');
          done();
        },
        fail
      );
    expect(getFnSpy.mock.calls.length).toBe(1);
    expect(getFnSpy.mock.calls[0]).toEqual(['https://blabla/v4/campaigns/42/games']);
  });

  it('should post a quiz answer', (done: jest.DoneCallback) => {
    const res = {
      data: {
        outcomes: [],
        answers: []
      },
    };
    putFnMock.mockReturnValue(of(res));

    service.postQuizAnswer({ questionId: '', content: [] }, 3)
      .subscribe(
        (s: { hasOutcomes: boolean }) => {
          expect(s.hasOutcomes).toBeFalsy();
          done();
        },
        fail
      );
    expect(putFnMock.mock.calls.length).toBe(1);
    expect(putFnMock.mock.calls[0]).toEqual([
      'https://blabla/v4/game_transactions/3/answer_quiz',
      { answer: { answer: [], question_id: '', time_taken: -1 } }
    ]);
  });

});
