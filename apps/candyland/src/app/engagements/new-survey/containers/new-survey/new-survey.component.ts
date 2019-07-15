import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'cl-new-survey',
  templateUrl: './new-survey.component.html',
  styleUrls: ['./new-survey.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewSurveyComponent implements OnInit {
  public formSurvey: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createSurveyForm();
  }
  public get name(): AbstractControl {
    return this.formSurvey.get('name');
  }

  public get headlineMessage(): AbstractControl {
    return this.formSurvey.get('headlineMessage');
  }

  public get subHeadlineMessage(): AbstractControl {
    return this.formSurvey.get('subHeadlineMessage');
  }

  public get buttonText(): AbstractControl {
    return this.formSurvey.get('buttonText');
  }

  public save(): void {
    console.log(this.formSurvey.value);
  }

  private createSurveyForm(): void {
    this.formSurvey = this.fb.group({
      name: ['Create Shake the Tree Template', [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(60)]
      ],
      headlineMessage: [null, [Validators.required,
        Validators.minLength(5),
        Validators.maxLength(60)]
      ],
      subHeadlineMessage: [null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(60)
      ]],
      background: [null, [Validators.required]],
      buttonText: [null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]]
    });
  }

}
