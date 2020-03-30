import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { IPoints, SecondsToStringPipe, NotificationService, IPopupConfig } from '@perxtech/core';
import { merge } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { oc } from 'ts-optchain';

@Component({
  selector: 'perx-blackcomb-pages-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.scss']
})
export class QuizResultsComponent implements OnInit {
  public results: IPoints[] = [];

  public backgroundImgUrl: string = 'assets/quiz/background.png';

  constructor(
    private secondsToString: SecondsToStringPipe,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  public ngOnInit(): void {
    merge(this.activatedRoute.data, this.activatedRoute.params)
      .pipe(
        filter((data: Data | Params) => data.results),
        map((data: Data | Params) => data.results),
        map((res: IPoints[] | string) => {
          if (typeof res === 'string') {
            res = JSON.parse(res);
          }
          return res;
        }),
      )
      .subscribe((res: IPoints[]) => this.results = res);
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
    const points = this.results.reduce((sum, p) => sum + p.points, 0);

    let popup: IPopupConfig;
    let nextRoute: string;
    if (this.correctAnswers !== this.results.length) {
      popup = {
        title: `You scored ${points} points for this round`,
        text: '無禮物? 唔緊要, 快D去profile填寫個人資料參加lucky draw抽大獎',
        buttonTxt: 'Try another quiz'
      };
      nextRoute = '/home';
    } else {
      popup = {
        title: `Congratulations! You scored ${points} points`,
        text: 'Here\'s a reward for you.',
        buttonTxt: 'View Reward',
        imageUrl: 'assets/quiz/reward.png'
      };
      nextRoute = '/wallet';
    }

    this.notificationService.addPopup(popup);
    this.router.navigate([nextRoute]);
  }

  private get correctAnswers(): number {
    return this.results.reduce((sum, q) => sum + (q.points > 0 ? 1 : 0), 0);
  }
}
