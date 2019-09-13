import { Component, OnInit } from '@angular/core';
import { NotificationService, ISurvey, SurveyService } from '@perx/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

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
          const id: string = params.get('id');
          const idN = Number.parseInt(id, 10);
          return this.surveyService.getSurveyFromCampaign(idN);
        }),
      );
  }

  public get progressBarValue(): number {
    return Math.round(this.currentPointer / this.totalLength * 100) || 0;
  }

  public get surveyComplete(): boolean {
    return this.currentPointer === this.totalLength;
  }
  public onSubmit(): void {
    this.surveyService.postSurveyAnswer(this.answers).subscribe(
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
