import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { IFormsService, AuthenticationService } from '@perx/core';
import { ISurvey, IProfileAttributes } from '@perx/core';
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
  public destroy$: Subject<void> = new Subject();
  public survey: ISurvey;
  public answers: IAnswer[];
  public totalLength: number;
  public currentPointer: number;

  constructor(private formSvc: IFormsService, private authSvc: AuthenticationService, public snack: MatSnackBar, private router: Router) { }

  public ngOnInit(): void {
    this.data$ = this.formSvc.getSignupForm();
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
    const mapOfObjects = this.answers
      .map(answer => ({[answer.question_id]:
        (Array.isArray(answer.content)  ? answer.content[0] : answer.content)}));

    const userObj: IProfileAttributes = Object.assign.apply(null, mapOfObjects);
    this.authSvc.createUserAndAutoLogin(userObj.primary_identifier, userObj).subscribe(
      () => {
        this.snack.open('User successfully created.', 'x', {duration: 2000});
        this.router.navigate(['/wallet']);
      },
      (err) => console.error(err)
    );
  }
}
