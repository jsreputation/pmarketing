import { Component, OnInit } from '@angular/core';
import { NotificationService, ISurvey, SurveyService } from '@perxtech/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';

interface IAnswer {
  questionId: string;
  content: any;
}

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
  public answers: IAnswer[];
  public totalLength: number;
  public currentPointer: number;
  public survey$!: Observable<ISurvey>;
  public survey: ISurvey;
  public moveId$: Observable<number>;
  private moveId: number;

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private surveyService: SurveyService
  ) { }

  public ngOnInit(): void {
    this.survey$ = this.route.paramMap
      .pipe(
        filter((params: ParamMap) => params.has('id')),
        switchMap((params: ParamMap) => {
          const id: string | null = params.get('id');
          if (!id) {
            return throwError({ message: 'survey id is required' });
          }
          const idN = Number.parseInt(id, 10);
          return this.surveyService.getSurveyFromCampaign(idN);
        }),
        tap((survey: ISurvey) => this.survey = survey)
      );

    this.moveId$ = this.survey$.pipe(
      switchMap((survey: ISurvey) => this.surveyService.getMoveId(survey.id)),
      tap((moveId: number) => this.moveId = moveId)
    );
  }

  public onSubmit(finalAnswer: IAnswer): void {
    console.log('submitting survey answers', finalAnswer);

    this.surveyService.postSurveyAnswer(
      finalAnswer,
      this.moveId
    ).pipe(
      tap((res: {
        hasOutcomes: boolean,
        answers: IAnswer[]
      }) => this.answers = res.answers)
    ).subscribe(
      (res) => {
        // reward guaranteed, need to clarified
        if (res.hasOutcomes) {
          this.notificationService.addPopup({
            text: 'Here is a reward for you.',
            title: 'Thanks for completing the survey.',
            buttonTxt: 'View Reward',
            imageUrl: 'assets/congrats_image.png'
          });
        } else {
          this.notificationService.addPopup({
            title: 'Thanks for completing the survey.',
            buttonTxt: 'Back To Home',
          });
        }
        this.router.navigate(['/']);
      }
    );
  }
}
