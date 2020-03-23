import { Component, OnInit } from '@angular/core';
import { NotificationService, ISurvey, SurveyService } from '@perxtech/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';

interface IAnswer {
  question_id: string;
  content: any;
}

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
  public data$: Observable<ISurvey>;
  public answers: IAnswer[];
  public totalLength: number;
  public currentPointer: number;
  private survey: ISurvey;

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private surveyService: SurveyService
  ) { }

  public ngOnInit(): void {
    this.data$ = this.route.paramMap
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
  }

  public get progressBarValue(): number {
    return Math.round(this.currentPointer / this.totalLength * 100) || 0;
  }

  public get surveyComplete(): boolean {
    return this.currentPointer === this.totalLength;
  }
  public onSubmit(): void {
    const surveyId = this.survey && this.survey.id ? Number.parseInt(this.survey.id, 10) : null;
    if (surveyId) {
      this.surveyService.postSurveyAnswer(this.answers, this.route.snapshot.params.id, surveyId).subscribe(
        () => {
          this.router.navigate(['/wallet']);
          this.notificationService.addPopup({
            text: 'Here is a reward for you.',
            title: 'Thanks for completing the survey.',
            buttonTxt: 'View Reward',
            imageUrl: 'assets/congrats_image.png'
          });
        }
      );
    }
  }

  public setTotalLength(totalLength: number): void {
    this.totalLength = totalLength;
  }

  public setCurrentPointer(currentPointer: number): void {
    this.currentPointer = currentPointer;
  }

  public updateSurveyStatus(answers: IAnswer[]): void {
    this.answers = answers;
  }
}
