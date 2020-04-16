import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ITracker, QuizQuestionType } from '../../models/quiz.model';

export interface ISelectPayload {
  type: QuizQuestionType.multipleChoice;
  multiple: boolean;
  choices: string[];
}

@Component({
  selector: 'perx-core-quiz-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class QuizSelectComponent implements OnChanges {
  @Input()
  public payload: ISelectPayload;

  @Input()
  public flush: boolean;

  @Output()
  public updateAnswers: EventEmitter<string[]> = new EventEmitter<string[]>();

  public selectedChoices: ITracker = {};
  public selectedChoice: number;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.flush && changes.flush.currentValue !== undefined) {
      this.emitValue();
    }
  }

  public emitValue(): void {
    let result: string[] = [];
    if (this.payload.multiple && this.selectedChoices) {
      result = Object.entries(this.selectedChoices)
        .filter(([key, value]) => key !== undefined && value !== undefined && value !== false)
        .map(data => data[0]);
    } else {
      result[0] = this.selectedChoice.toString();
    }
    this.updateAnswers.emit(result);
  }

  public isSelected(index: number): boolean {
    return this.payload.multiple ? this.selectedChoices && this.selectedChoices[index] : this.selectedChoice === index;
  }
}
