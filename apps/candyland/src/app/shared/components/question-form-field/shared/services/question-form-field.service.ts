import { Injectable } from '@angular/core';
import {
  SurveyQuestionType
} from '../../../../../engagements/new-survey/containers/new-survey/new-survey.component';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Injectable()
export class QuestionFormFieldService {
  focusedElementIndex: any;
  constructor(private fb: FormBuilder) { }

  public set focusedElem(val: any) {
    this.focusedElementIndex = val.toString();
  }

  public getFocusedElem( index: number, level: number) {
    if (!this.focusedElementIndex) {
      return false;
    }
    const res = this.focusedElementIndex.split('-');

    if (level > 0) {
      return this.focusedElementIndex === index;
    }
    return +res[level] === +index;
  }

  public getSimpleControl(): FormControl {
    return this.fb.control(null, []);
  }

  public createFormField(type: string) {
    switch (type) {
      case SurveyQuestionType.rating:
        return this.ratingGroup(type);
      default:
        return this.fb.group({});
    }
  }

  private ratingGroup(type) {
    return this.fb.group({
      selectedType: [type, [Validators.required]],
      title: [null, [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(60)]],
      scale: [null, []],
      selectShape: [null, []],
      selectColor: [null, []],
      left: [null, []],
      right: [null, []],
      required: [null, []]
    });
  }
}
