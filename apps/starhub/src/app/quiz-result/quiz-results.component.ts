import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { IPoints, NotificationService, IPopupConfig, IQuiz } from '@perxtech/core';
import { merge, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { oc } from 'ts-optchain';

@Component({
  selector: 'app-quiz-results',
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
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
        this.title = this.correctAnswers !== this.results.length ? 'You Failed!' : 'You passed!';
        this.subTitle = `You scored ${this.correctAnswers} out of ${this.results.length} Quiz Points`;
      });
  }

  public next(): void {
    let nextRoute: string;
    if (this.correctAnswers !== this.results.length) {
      const noOutcome = oc(this.quiz).results.noOutcome(); // note: currently empty because not configured;
      this.popup = {
        title: oc(noOutcome).title(''),
        text: oc(noOutcome).subTitle('Sorry try again'),
        imageUrl: oc(noOutcome).image(),
        buttonTxt: oc(noOutcome).button('NEXT')
      };
      this.notificationService.addPopup(this.popup);
      nextRoute = '/home';
    } else {
      const outcome = oc(this.quiz).results.outcome();
      this.popup = {
        /* eslint-disable */
        title: oc(outcome).title['en'].text(''),
        text: oc(outcome).subTitle['en'].text('A Reward is on your way!'),
        buttonTxt: oc(outcome).button['en'].text('NEXT'),
        imageUrl: 'assets/quiz/reward.png',
        ctaButtonClass: 'ga_game_completion'
        /* eslint-enable */
      };
      this.notificationService.addPopup(this.popup);
      nextRoute = '/wallet';
    }
    this.router.navigate([nextRoute]);
  }

  private get correctAnswers(): number {
    return this.results.reduce((sum, q) => sum + (q.points && q.points > 0 ? 1 : 0), 0);
  }
}