import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import {
  IPoints, SecondsToStringPipe, NotificationService, IPopupConfig, IQuiz, LocaleIdFactory,
  TokenStorage, IPrizeSetOutcome, RewardPopupComponent, IRewardPopupConfig, ConfigService, IConfig
} from '@perxtech/core';
import { merge, Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { oc } from 'ts-optchain';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'perx-blackcomb-pages-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.scss']
})
export class QuizResultsComponent implements OnInit {
  public results: IPoints[] = [];
  public timeConsumed: Observable<string>;

  public backgroundImgUrl: string = '';
  private quiz: IQuiz | undefined;
  private popup: IPopupConfig;
  public title: string;
  public subTitle: string;
  public rewardsAcquired: boolean = false;
  public prizeSetOutcome: IPrizeSetOutcome[];
  public showPrizeSetOutcome: boolean = false;

  constructor(
    private secondsToString: SecondsToStringPipe,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private tokenStorage: TokenStorage,
    private notificationService: NotificationService,
    private translate: TranslateService,
    private dialog: MatDialog,
    private configService: ConfigService
  ) { }

  public ngOnInit(): void {

    this.configService.readAppConfig().subscribe(
      (config: IConfig<void>) => {
        this.showPrizeSetOutcome = config.showPrizeSetOutcome ? config.showPrizeSetOutcome : false;
      }
    );

    this.translate.get('QUIZ_TEMPLATE.QUESTION_TIME_TAKEN').subscribe((text) => {
      this.timeConsumed = of(text);
    });
    merge(this.activatedRoute.data, this.activatedRoute.params)
      .pipe(
        filter((data: Data | Params) => data.results),
        map((data: Data | Params) => data.results),
        map((res: { points: IPoints[], quiz?: IQuiz, prizeSet?: IPrizeSetOutcome[] } | string) => {
          if (typeof res === 'string') {
            res = JSON.parse(res);
          }
          return res;
        }),
      )
      .subscribe((res: { points: IPoints[], quiz?: IQuiz, prizeSet?: IPrizeSetOutcome[], rewardAcquired: boolean }) => {
        this.results = res.points;
        this.prizeSetOutcome = res.prizeSet ? res.prizeSet : [];
        this.rewardsAcquired = res.rewardAcquired;
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
    const total = this.results.reduce((sum, q) => sum + Math.floor(oc(q).time(0)), 0);
    if (total === 0) {
      this.subTitle = '';
    }

    this.translate.get('QUIZ_TEMPLATE.SUMMARY_TIME_TAKEN').subscribe((text) => {
      this.subTitle = `${text}${this.secondsToString.transform(total)}`;
    });
  }

  public get currentLang(): string {
    return LocaleIdFactory(this.tokenStorage) || 'en';
  }

  public next(): void {
    const points = this.results.reduce((sum, p) => sum + oc(p).points(0), 0);
    let nextRoute: string;
    if (!this.rewardsAcquired) {
      const noOutcome = oc(this.quiz).results.noOutcome(); // note: currently empty because not configured;
      this.translate.get([
        'QUIZ_TEMPLATE.NO_OUTCOME_SCORE',
        'QUIZ_TEMPLATE.NO_OUTCOME_TXT',
        'QUIZ_TEMPLATE.NO_OUTCOME_CTA'
      ]).subscribe((res: any) => {
        const noOutcomeTitle = (res['QUIZ_TEMPLATE.NO_OUTCOME_SCORE']).replace('{{points}}', points);
        this.popup = {
          /* eslint-disable */
          title: oc(noOutcome).title[this.currentLang].text(noOutcomeTitle),
          text: oc(noOutcome).subTitle[this.currentLang].text(res['QUIZ_TEMPLATE.NO_OUTCOME_TXT']),
          imageUrl: oc(noOutcome).image(),
          buttonTxt: oc(noOutcome).button[this.currentLang].text(res['QUIZ_TEMPLATE.NO_OUTCOME_CTA'])
          /* eslint-enable */
        };
        this.notificationService.addPopup(this.popup);
      });
      nextRoute = '/home';
      this.router.navigate([nextRoute]);
    } else {
      const outcome = oc(this.quiz).results.outcome();
      this.translate.get([
        'QUIZ_TEMPLATE.POSITIVE_OUTCOME_TXT',
        'QUIZ_TEMPLATE.POSITIVE_OUTCOME_REWARD',
        'QUIZ_TEMPLATE.POSITIVE_OUTCOME_CTA',
        'PRIZE_SET.OUTCOME_SUCCESS_TITLE'
      ]).subscribe((res: any) => {
        const outcomeTitle = (res['QUIZ_TEMPLATE.POSITIVE_OUTCOME_TXT']).replace('{{points}}', points);
        this.popup = {
          title: oc(outcome).title[this.currentLang].text(outcomeTitle),
          text: oc(outcome).subTitle[this.currentLang].text(res['QUIZ_TEMPLATE.POSITIVE_OUTCOME_REWARD']),
          buttonTxt: oc(outcome).button[this.currentLang].text(res['QUIZ_TEMPLATE.POSITIVE_OUTCOME_CTA']),
          imageUrl: oc(outcome).image('assets/quiz/reward.png'),
          ctaButtonClass: 'ga_game_completion'
        };
        if (this.showPrizeSetOutcome && this.prizeSetOutcome && this.prizeSetOutcome.length > 0) {
            const prizeSetOutcome = this.prizeSetOutcome[0];
            const data: IRewardPopupConfig = this.popup;
            data.url = `/prize-set-outcomes/${prizeSetOutcome.prizeSetId}?transactionId=${prizeSetOutcome.transactionId}`;
            data.afterClosedCallBackRedirect = this;
            data.disableOverlayClose = true;
            data.showCloseBtn = false;
            data.buttonTxt = res['PRIZE_SET.OUTCOME_SUCCESS_TITLE'];
            this.dialog.open(RewardPopupComponent, {data});
        } else {
          this.notificationService.addPopup(this.popup);
          nextRoute = '/wallet';
          this.router.navigate([nextRoute]);
        }
      });
    }
  }

  private get correctAnswers(): number {
    return this.results.reduce((sum, q) => sum + (q.points && q.points > 0 ? 1 : 0), 0);
  }

  public closeAndRedirect(url: string): void {
    this.router.navigateByUrl(url);
  }
}
