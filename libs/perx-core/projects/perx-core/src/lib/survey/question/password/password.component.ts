import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { IAnswer, SurveyQuestionType } from '../../models/survey.model';

export interface IPasswordPayload {
  type: SurveyQuestionType.password;
  'max-length'?: number;
}

@Component({
  selector: 'perx-core-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit, OnChanges {
  @Input()
  public payload: IPasswordPayload;

  @Input()
  public flush: boolean;

  @Output()
  public updateAnswers: EventEmitter<IAnswer> = new EventEmitter<IAnswer>();

  public answer: string;
  private subject: Subject<string> = new Subject();

  public ngOnInit(): void {
    this.subject.pipe(
      debounceTime(500)
    ).subscribe(inputValue => {
      this.updateAnswers.emit({ content: inputValue });
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.flush && changes.flush.currentValue !== undefined) {
      this.updateInput(this.answer);
    }
  }

  public updateInput(value: string): void {
    this.answer = value;
    this.subject.next(value);
  }

}
