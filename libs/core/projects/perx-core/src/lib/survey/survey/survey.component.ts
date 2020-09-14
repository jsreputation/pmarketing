import {
  Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges
} from '@angular/core';

import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { IAnswer } from '../models/survey.model';

@Component({
  selector: 'perx-core-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit, OnChanges {
  @Output()
  public submitted: EventEmitter<IAnswer> = new EventEmitter();
  @Input('fields')
  public fieldsSurvey: FormlyFieldConfig[];
  @Input('moveId')
  public moveId: number;
  public form: FormGroup = new FormGroup({});
  public model: {} = {
  }; // what is fetched from the api etc
  // how formly decides how the form is going to look like
  public fields:  FormlyFieldConfig[] = [{
    type: 'stepper',
    fieldGroup: []
  }];

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.moveId) {
      this.model = {
        ...this.model,
        id: changes.moveId.currentValue
      };
    }
  }

  public ngOnInit(): void {
    this.fields = [{
      ...this.fields[0],
      fieldGroup: this.fieldsSurvey
    }];
  }

  public onSubmit(): void {
    const answer = Object.entries(this.model).map(([key, value]): IAnswer => ({
      questionId: key,
      content: value
    })).pop();
    this.submitted.emit(answer);
  }
}
