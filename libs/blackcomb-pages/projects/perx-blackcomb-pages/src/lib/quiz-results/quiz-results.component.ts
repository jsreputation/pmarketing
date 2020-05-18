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
  public title: string;
  public subTitle: string;

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
        this.fetchTitle();
        this.fetchSubTitle();
      });
  }

  public fetchTitle(): void {
    this.translate.get('QUIZ_TEMPLATE.SUMMARY_CORRECT').subscribe((text) => {
      this.title = text.replace('{{total_length}}', this.results.length).replace('{{total_correct}}', this.correctAnswers);
    });
  }

  public fetchSubTitle(): void {
    const total = this.results.reduce((sum, q) => sum + oc(q).time(0), 0);
    if (total === 0) {
      this.subTitle = '';
    }

    this.translate.get('QUIZ_TEMPLATE.SUMMARY_TIME_TAKEN').subscribe((text) => {
      this.subTitle = `${text}${this.secondsToString.transform(total)}`;
    });
  }

  public next(): void {
    const points = this.results.reduce((sum, p) => sum + oc(p).points(0), 0);

    let nextRoute: string;
    if (this.correctAnswers !== this.results.length) {
      const noOutcome = oc(this.quiz).results.noOutcome();
      this.translate.get([
        'QUIZ_TEMPLATE.NO_OUTCOME_SCORE',
        'QUIZ_TEMPLATE.NO_OUTCOME_TXT',
        'QUIZ_TEMPLATE.NO_OUTCOME_CTA'
      ]).subscribe((res: any) => {
        const noOutcomeTitle = res['QUIZ_TEMPLATE.NO_OUTCOME_SCORE'].replace('{{points}}', points);
        this.popup = {
          title: oc(noOutcome).title(noOutcomeTitle),
          text: oc(noOutcome).subTitle(res['QUIZ_TEMPLATE.NO_OUTCOME_TXT']),
          imageUrl: oc(noOutcome).image(),
          buttonTxt: oc(noOutcome).button(res['QUIZ_TEMPLATE.NO_OUTCOME_CTA'])
        };
        this.notificationService.addPopup(this.popup);
      });
      nextRoute = '/home';
    } else {
      const outcome = oc(this.quiz).results.outcome();
      this.translate.get([
        'QUIZ_TEMPLATE.POSITIVE_OUTCOME_TXT',
        'QUIZ_TEMPLATE.POSITIVE_OUTCOME_REWARD',
        'QUIZ_TEMPLATE.POSITIVE_OUTCOME_CTA'
      ]).subscribe((res: any) => {
        const outcomeTitle = res['QUIZ_TEMPLATE.POSITIVE_OUTCOME_TXT'].replace('{{points}}', points);
        this.popup = {
          title: oc(outcome).title(outcomeTitle),
          text: oc(outcome).subTitle(res['QUIZ_TEMPLATE.POSITIVE_OUTCOME_REWARD']),
          buttonTxt: oc(outcome).button(res['QUIZ_TEMPLATE.POSITIVE_OUTCOME_CTA']),
          imageUrl: 'assets/quiz/reward.png',
          ctaButtonClass: 'ga_game_completion'
        };
        this.notificationService.addPopup(this.popup);
      });
      nextRoute = '/wallet';
    }
    this.router.navigate([nextRoute]);
  }

  private get correctAnswers(): number {
    return this.results.reduce((sum, q) => sum + (q.points && q.points > 0 ? 1 : 0), 0);
  }
}
