import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

interface IPayloadLongText {
  type: string;
  'max-length': number;
}

@Component({
  selector: 'perx-core-quiz-long-text',
  templateUrl: './long-text.component.html',
  styleUrls: ['./long-text.component.scss']
})
export class QuizLongTextComponent implements OnChanges, OnInit {
  @Input()
  public payload: IPayloadLongText;

  @Input()
  public flush: boolean;

  @Output()
  public updateAnswers: EventEmitter<string> = new EventEmitter<string>();

  public answer: string;
  private subject: Subject<string> = new Subject();

  public ngOnInit(): void {
    this.subject.pipe(
      debounceTime(300)
    ).subscribe(inputValue => {
      this.updateAnswers.emit(inputValue);
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
