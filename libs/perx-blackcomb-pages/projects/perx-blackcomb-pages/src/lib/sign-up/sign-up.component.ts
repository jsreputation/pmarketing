import { Router } from '@angular/router';
import { IFormsService } from '@perx/core';
import { ISurvey } from '@perx/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

interface IAnswer {
  question_id: string;
  content: any;
}

@Component({
  selector: 'perx-blackcomb-pages-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {
  public data$: Observable<ISurvey>;
  public destroy$: Subject<any> = new Subject();
  public survey: ISurvey;
  public answers: IAnswer[];
  public totalLength: number;
  public currentPointer: number;
  // go inside survey to setup email validation --
  // set up submit button t cognito users
  constructor(private formSvc: IFormsService, private router: Router) { }


  public ngOnInit() {
    this.data$ = this.formSvc.getSignupForm();
    this.data$.subscribe((survey: ISurvey) => {
      this.survey = survey;
    },
    () => {
      this.router.navigate(['/wallet']);
    })
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public get surveyComplete(): boolean {
    return this.currentPointer === this.totalLength;
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

  public onSubmit(): void {
    console.log(this.answers, this.survey);
  }



}
