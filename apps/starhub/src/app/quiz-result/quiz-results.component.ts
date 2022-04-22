import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ICampaign, ICampaignService, IPoints, IPopupConfig, IQuiz, NotificationService } from '@perxtech/core';
import { CampaignDisplayProperties } from 'libs/core/projects/perx-core/src/lib/campaign/models/campaign.model';
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
  private rewardAcquired: boolean | undefined;
  public displayProperties: CampaignDisplayProperties = {};
  public buttonStyle: { [key: string]: string } = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private translateService: TranslateService,
    private campaignService: ICampaignService,
  ) { }

  public ngOnInit(): void {
    const lang = this.translateService.currentLang || this.translateService.defaultLang;
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
      .subscribe((res: { points: IPoints[], quiz?: IQuiz, rewardAcquired?: boolean }) => {
        this.results = res.points;
        this.rewardAcquired = res.rewardAcquired;
        this.backgroundImgUrl = oc(res).quiz.backgroundImgUrl('');
        this.quiz = res.quiz;
        this.title = this.correctAnswers !== this.results.length ? 'You Failed!' : 'You passed!';
        this.subTitle = `You scored ${this.correctAnswers} out of ${this.results.length} Quiz Points`;

        if (this.quiz) {
          this.campaignService.getCampaign(Number(this.quiz.campaignId), lang).subscribe((campaign: ICampaign) => {
            if (campaign) {
              const buttonBgColour = campaign.displayProperties?.buttonBgColour;
              const buttonTextColour = campaign.displayProperties?.buttonTextColour;
              this.displayProperties = campaign.displayProperties as any;
              this.buttonStyle['background-color'] = buttonBgColour ? buttonBgColour : '';
              this.buttonStyle.color = buttonTextColour ? buttonTextColour : '';
              // the following will affect secondaryCTAText. todo: use different styling for secondaryCTAbutton
              this.buttonStyle.border = 'none';
            }
          });
        }
      });
  }

  public next(): void {
    let nextRoute: string;
    if (this.correctAnswers !== this.results.length || !this.rewardAcquired) {
      const noOutcome = oc(this.quiz).results.noOutcome(); // note: currently empty because not configured;
      this.popup = {
        /* eslint-disable */
        title: oc(noOutcome).title['en'].text(''),
        text: oc(noOutcome).subTitle['en'].text('Sorry try again'),
        imageUrl: oc(noOutcome).image(),
        buttonTxt: oc(noOutcome).button['en'].text('NEXT')
        /* eslint-enable */
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
        imageUrl: oc(outcome).image() || 'assets/reward.png',
        ctaButtonClass: 'ga_game_completion'
        /* eslint-enable */
      };
      this.notificationService.addPopup(this.popup);
      nextRoute = '/home/vouchers';
    }
    this.router.navigate([nextRoute]);
  }

  private get correctAnswers(): number {
    return this.results.reduce((sum, q) => sum + (q.points && q.points > 0 ? 1 : 0), 0);
  }
}
