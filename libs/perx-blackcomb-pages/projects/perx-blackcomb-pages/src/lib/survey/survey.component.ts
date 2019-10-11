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
  selector: 'perx-blackcomb-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
  public data$: Observable<ISurvey>;
  public survey: ISurvey;
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
        })
      );
    this.data$.subscribe(
      (survey: ISurvey) => {
        this.survey = survey;
      },
      () => {
        this.router.navigate(['/wallet']);
      }
    );
  }

  public get progressBarValue(): number {
    return Math.round(this.currentPointer / this.totalLength * 100) || 0;
  }

  public get surveyComplete(): boolean {
    return this.currentPointer === this.totalLength;
  }
  public onSubmit(): void {
    this.surveyService.postSurveyAnswer(this.answers, this.survey, this.route.snapshot.params.id).subscribe(
      (res) => {
        let text: string;
        let title: string;
        let imageUrl: string;
        let buttonTxt: string;
        if (res.hasOutcomes) {
          text = 'See you at our event!';
          title = 'Your RSVP is successful!';
          buttonTxt = 'To Wallet';
          imageUrl = 'assets/congrats_image.png';
        } else {
          text = 'Nonetheless, we’ve added you to our waiting list for the event and will call you when places are available by 07 October 2019';
          title = 'Thank you for your interest. We’re sorry, all places have been taken.';
          buttonTxt = null;
        }
        this.router.navigate(['/wallet']);
        this.notificationService.addPopup({
          text,
          title,
          buttonTxt,
          imageUrl
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
