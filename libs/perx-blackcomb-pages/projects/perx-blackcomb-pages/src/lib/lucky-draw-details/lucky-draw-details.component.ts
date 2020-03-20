import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ISurvey, IAnswer, IFormsService } from '@perxtech/core';

@Component({
  selector: 'perx-blackcomb-pages-lucky-draw-details',
  templateUrl: './lucky-draw-details.component.html',
  styleUrls: ['./lucky-draw-details.component.scss']
})
export class LuckyDrawDetailsComponent implements OnInit {

  public data$: Observable<ISurvey | undefined>;
  public survey: ISurvey;
  public answers: IAnswer[];
  public totalLength: number;
  public currentPointer: number;

  constructor(
    private formSvc: IFormsService,
  ) { }

  public ngOnInit(): void {
    this.data$ = this.formSvc.getLuckyDrawDetailsForm();
  }

  public get formComplete(): boolean {
    return this.currentPointer === this.totalLength;
  }

  public setTotalLength(totalLength: number): void {
    this.totalLength = totalLength;
  }

  public setCurrentPointer(currentPointer: number): void {
    this.currentPointer = currentPointer;
  }

  public updateFormStatus(answers: IAnswer[]): void {
    this.answers = answers;
  }

  public onSubmit(): void {
  }
}