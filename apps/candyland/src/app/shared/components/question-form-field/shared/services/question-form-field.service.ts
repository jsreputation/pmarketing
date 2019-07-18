import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class QuestionFormFieldService {
  focusedElementIndex: any;
  private formControls = {
    rating: (type) => this.ratingGroup(type),
    date: (type) => this.dateGroup(type),
    phone: (type) => this.phoneGroup(type),
    questionGroup: (type) => this.questionGroup(type)
  };
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
    return this.formControls[type](type);
  }

  private ratingGroup(type: string): FormGroup {
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

  private dateGroup(type: string): FormGroup {
    return this.fb.group({
      selectedType: [type, [Validators.required]],
      title: [null, [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(60)]],
      startDate: [null, [Validators.required]],
      endDate: [null],
      required: [null, []]
    });
  }

  private phoneGroup(type: string): FormGroup {
    return this.fb.group({
      selectedType: [type, [Validators.required]],
      title: [null, [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(60)]],
      phone: [null, [Validators.required]],
      required: [null, []]
    });
  }

  private questionGroup(type: string): FormGroup {
    return this.fb.group({
      selectedType: [type, [Validators.required]],
      title: [null, [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(60)]],
      questionGroup: this.fb.array([]),
      required: [null, []]
    });
  }
}
