import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { IAnswer, SurveyQuestionType } from '../../models/survey.model';

export interface ILongTextPayload {
  type: SurveyQuestionType.longText;
  'max-length'?: number;
}

@Component({
  selector: 'perx-core-long-text',
  templateUrl: './long-text.component.html',
  styleUrls: ['./long-text.component.scss']
})
export class LongTextComponent implements OnChanges, OnInit {
  @Input()
  public payload: ILongTextPayload;
  @Input()
  public flush: boolean;

  @Output()
  public updateAnswers: EventEmitter<IAnswer> = new EventEmitter<IAnswer>();

  public answer: string;

  private subject: Subject<string> = new Subject();

  public ngOnInit(): void {
    this.subject.pipe(
      debounceTime(300)
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
