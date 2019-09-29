import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ControlsName } from '../../models/controls-name';
import { ISurveyForm } from '@cl-core/models/survey/survey-common.interface';

export class NewSurveyForm {

  public static getForm(): FormGroup {
    return new FormGroup({
      name: new FormControl(
        null,
        [Validators.required, Validators.minLength(1), Validators.maxLength(60)]
      ),
      headlineMessage: new FormControl(
        null,
        [Validators.required, Validators.minLength(5), Validators.maxLength(60)]
      ),
      subHeadlineMessage: new FormControl(
        null,
        [
          // Validators.required,
          Validators.minLength(5),
          Validators.maxLength(250)
        ]
      ),
      questions: new FormArray([]),
      color: new FormControl(
        null,
        [Validators.required]
      ),
      cardBackground: new FormControl(
        null,
        [Validators.required]
      ),
      background: new FormControl(
        null,
        [Validators.required]
      ),
      buttonText: new FormControl('start', [
        // Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ])
    });
  }

  public static getDefaultValue(queryData: any): Partial<ISurveyForm> {
    return {
      name: 'Survey Template',
      color: 'primary',
      [ControlsName.background]: queryData.background[0],
      [ControlsName.cardBackground]: queryData.cardBackground[0]
    };
  }
}
