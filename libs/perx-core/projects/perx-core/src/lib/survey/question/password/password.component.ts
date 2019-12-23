import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {IAnswer} from '../../models/survey.model';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

interface IPayloadPassword {
  type: string;
  'max-length': number;
}

@Component({
  selector: 'perx-core-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit, OnChanges {
  @Input()
  public payload: IPayloadPassword;

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
