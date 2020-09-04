import {
  Component, EventEmitter, Input, OnInit, Output
} from '@angular/core';

import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'perx-core-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
  @Output()
  public submitted: EventEmitter<{[key: string]: any}> = new EventEmitter();
  @Input('fields')
  public fieldsSurvey: FormlyFieldConfig[];
  public form: FormGroup = new FormGroup({});
  public model: {} = {
  }; // what is fetched from the api etc
  // how formly decides how the form is going to look like
  public fields:  FormlyFieldConfig[] = [{
    type: 'stepper',
    fieldGroup: []
  }];

  public ngOnInit(): void {
    this.fields = [{
      ...this.fields[0],
      fieldGroup: this.fieldsSurvey
    }];
  }

  public onSubmit(): void {
    this.submitted.emit(this.model);
  }
}
