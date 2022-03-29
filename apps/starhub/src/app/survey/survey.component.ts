import { Component, OnInit } from '@angular/core';
import {
  NotificationService,
  ISurvey,
  SurveyService,
  IPopupConfig,
} from '@perxtech/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';

interface IAnswer {
  questionId: string;
  content: any;
}

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss'],
})
export class SurveyComponent implements OnInit {
  public answers: IAnswer[];
  public totalLength: number;
  public currentPointer: number;
  public survey$!: Observable<ISurvey>;
  public survey: ISurvey;
  public moveId$: Observable<number>;
  private moveId: number;
  public displayProperties: any;

  public successPopUp: IPopupConfig = {
    title: 'Thanks for completing the survey.',
    text: 'Here is a reward for you.',
    imageUrl: '',
    buttonTxt: 'View Reward'
  };

  public noRewardsPopUp: IPopupConfig = {
    title: 'Thanks for completing the survey.',
    text: '',
    buttonTxt: 'Back To Home'
  };

  private notAvailablePopUp: IPopupConfig = {
    title: 'Sorry',
    text: 'This survey is not available at the moment. Try again later.',
    buttonTxt: 'Back To Home'
  };

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private surveyService: SurveyService
  ) {}

  public ngOnInit(): void {
    this.survey$ = this.route.paramMap.pipe(
      filter((params: ParamMap) => params.has('id')),
      switchMap((params: ParamMap) => {
        const id: string | null = params.get('id');
        if (!id) {
          return throwError({ message: 'survey id is required' });
        }
        const idN = Number.parseInt(id, 10);
        return this.surveyService.getSurveyFromCampaign(idN);
      }),
      map((survey: ISurvey) => {
        let fields = survey.fields;
        fields = fields?.map((field) => ({
          ...field,
          templateOptions: {
            ...field.templateOptions,
            ctaButtonBGColor: survey.ctaButtonBGColor || '#1ed760',
            ctaButtonTextColor: survey.ctaButtonTextColor || '#09411d',
          },
        }));

        return {
          ...survey,
          fields,
        };
      }),
      catchError((err: Error) => {
        console.error(err.name, err.message);
        this.notificationService.addPopup(this.notAvailablePopUp);
        this.router.navigate(['/home']);
        return EMPTY;
      }),
      tap((survey: ISurvey) => {
        this.survey = survey;
        if (survey) {
          const successOutcome = survey.results.outcome;
          const noOutcome = survey.results.noOutcome;

          if (noOutcome) {
            this.noRewardsPopUp.title = noOutcome.title;
            this.noRewardsPopUp.text = noOutcome.subTitle;
            this.noRewardsPopUp.buttonTxt =
              noOutcome.button || this.noRewardsPopUp.buttonTxt;
          }
          if (successOutcome) {
            this.successPopUp.title = successOutcome.title;
            this.successPopUp.text = successOutcome.subTitle;
            this.successPopUp.imageUrl = successOutcome.image;
            this.successPopUp.buttonTxt =
              successOutcome.button || this.successPopUp.buttonTxt;
          }
        }
      })
    );

    this.moveId$ = this.survey$.pipe(
      switchMap((survey: ISurvey) => this.surveyService.getMoveId(survey.id)),
      tap((moveId: number) => (this.moveId = moveId))
    );
  }

  public onSubmit(finalAnswer: IAnswer): void {
    console.log('submitting survey answers', finalAnswer);

    this.surveyService
      .postSurveyAnswer(finalAnswer, this.moveId)
      .pipe(
        tap(
          (res: { hasOutcomes: boolean; answers: IAnswer[] }) =>
            (this.answers = res.answers)
        )
      )
      .subscribe(() => {
        this.surveyService
          .postFinalSurveyAnswer(this.moveId)
          .subscribe((res) => {
            // reward guaranteed, need to clarified
            if (res && res.rewardAcquired) {
              this.notificationService.addPopup(this.successPopUp);
            } else {
              this.notificationService.addPopup(this.noRewardsPopUp);
            }
            this.router.navigate(['/']);
          });
      });
  }
}
