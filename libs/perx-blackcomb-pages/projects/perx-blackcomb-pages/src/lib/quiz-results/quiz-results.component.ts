import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { IPoints, SecondsToStringPipe, NotificationService, IPopupConfig, IQuiz } from '@perxtech/core';
import { merge } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { oc } from 'ts-optchain';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'perx-blackcomb-pages-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.scss']
})
export class QuizResultsComponent implements OnInit {
  public results: IPoints[] = [];

  public backgroundImgUrl: string = '';
  private quiz: IQuiz | undefined;
  private popup: IPopupConfig;

  constructor(
    private secondsToString: SecondsToStringPipe,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private translate: TranslateService
  ) { }

  public ngOnInit(): void {
    merge(this.activatedRoute.data, this.activatedRoute.params)
      .pipe(
        filter((data: Data | Params) => data.results),
        map((data: Data | Params) => data.results),
        map((res: { points: IPoints[], quiz?: IQuiz } | string) => {
          if (typeof res === 'string') {
            res = JSON.parse(res);
          }
          return res;
        }),
      )
      .subscribe((res: { points: IPoints[], quiz?: IQuiz }) => {
        this.results = res.points;
        this.backgroundImgUrl = oc(res).quiz.backgroundImgUrl('');
        this.quiz = res.quiz;
      });
  }

  public get title(): string {
    return `You got ${this.correctAnswers} out of ${this.results.length} questions correct!`;
  }

  public get subTitle(): string | null {
    const total = this.results.reduce((sum, q) => sum + oc(q).time(0), 0);
    if (total === 0) {
      return null;
    }
    return `You took a total of ${this.secondsToString.transform(total)}`;
  }

  public next(): void {
    const points = this.results.reduce((sum, p) => sum + oc(p).points(0), 0);

    let nextRoute: string;
    if (this.correctAnswers !== this.results.length) {
      const noOutcome = oc(this.quiz).results.noOutcome();
      this.popup = {
        title: oc(noOutcome).title('QUIZ_TEMPLATE.NO_OUTCOME_SCORE'),
        text: oc(noOutcome).subTitle('QUIZ_TEMPLATE.NO_OUTCOME_TXT'),
        imageUrl: oc(noOutcome).image(),
        buttonTxt: oc(noOutcome).button('QUIZ_TEMPLATE.NO_OUTCOME_CTA')
      };
      nextRoute = '/home';
    } else {
      const outcome = oc(this.quiz).results.outcome();
      this.popup = {
        title: oc(outcome).title('QUIZ_TEMPLATE.POSITIVE_OUTCOME_TXT'),
        text: oc(outcome).subTitle('QUIZ_TEMPLATE.POSITIVE_OUTCOME_REWARD'),
        buttonTxt: oc(outcome).button('QUIZ_TEMPLATE.POSITIVE_OUTCOME_CTA'),
        imageUrl: 'assets/quiz/reward.png',
        ctaButtonClass: 'ga_game_completion'
      };
      nextRoute = '/wallet';
    }

    this.translate.get([this.popup.title || '', this.popup.text || '', this.popup.buttonTxt || '']).subscribe(
      ([title, text, buttonTxt]) => {
        this.popup = {
          ...this.popup,
          title: title.replace('{{points}}', points),
          text,
          buttonTxt
        };

        this.notificationService.addPopup(this.popup);
      }
    );
    this.router.navigate([nextRoute]);
  }

  private get correctAnswers(): number {
    return this.results.reduce((sum, q) => sum + (q.points && q.points > 0 ? 1 : 0), 0);
  }
}
