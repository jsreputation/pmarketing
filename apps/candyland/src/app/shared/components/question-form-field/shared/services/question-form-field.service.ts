import { ChangeDetectorRef, Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class QuestionFormFieldService {
  public focusedElementIndex: any;
  public cd: ChangeDetectorRef;
  public listIdDrag = [];

  private formControls = {
    rating: (type) => this.ratingGroup(type),
    date: (type) => this.dateGroup(type),
    phone: (type) => this.phoneGroup(type),
    questionGroup: (type) => this.questionGroup(type),
    longText: (type) => this.questionLongText(type),
    pictureChoice: (type) => this.questionPictureChoice(type),
    multipleChoice: (type) => this.questionMultipleChoice(type),
  };
  private idCounter = 0;
  constructor(private fb: FormBuilder) { }

  public get listId() {
    return `drag-list-id-${this.idCounter++}`;
  }

  public set listId(id: string) {
    this.listIdDrag.push(id);
  }

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
    return this.fb.control(null, [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(120)
    ]);
  }

  public createFormField(type: string) {
    return this.formControls[type](type);
  }

  private ratingGroup(type: string): FormGroup {
    return this.fb.group({
      selectedType: [type, [Validators.required]],
      name: [null, [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(60)]],
      scale: ['5', []],
      selectShape: ['star', []],
      selectColor: ['primary', []],
      left: ['Not Very', [Validators.maxLength(10)]],
      right: ['Very much', [Validators.maxLength(10)]],
      required: [true, []],
      description: [{value: '', disabled: true}, [Validators.maxLength(120)]]
    });
  }

  private dateGroup(type: string): FormGroup {
    return this.fb.group({
      selectedType: [type, [Validators.required]],
      name: [null, [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(60)]],
      startDate: [null, [Validators.required]],
      endDate: [null],
      required: [true, []],
      description: [{value: '', disabled: true}, [Validators.maxLength(120)]]
    });
  }

  private phoneGroup(type: string): FormGroup {
    return this.fb.group({
      selectedType: [type, [Validators.required]],
      name: [null, [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(60)]],
      phone: [null, [Validators.required]],
      required: [true, []],
      description: [{value: '', disabled: true}, [Validators.maxLength(120)]]
    });
  }

  private questionGroup(type: string): FormGroup {
    return this.fb.group({
      selectedType: [type, [Validators.required]],
      name: [null, [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(60)]],
      questionGroup: this.fb.array([]),
      required: [true, []],
      description: [{value: '', disabled: true}, [Validators.maxLength(120)]]
    });
  }

  private questionLongText(type: string): FormGroup {
    return this.fb.group({
      selectedType: [type, [Validators.required]],
      name: [null, [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(60)]],
      text: [null, [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(200)]],
      required: [true, []],
      description: [{value: '', disabled: true}, [Validators.maxLength(120)]]
    });
  }

  private questionPictureChoice(type: string): FormGroup {
    return this.fb.group({
      selectedType: [type, [Validators.required]],
      name: [null, [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(60)]],
      picture: this.fb.array([]),
      required: [true, []],
      description: [{value: '', disabled: true}, [Validators.maxLength(120)]]
    });
  }

  private questionMultipleChoice(type: string): FormGroup {
    return this.fb.group({
      selectedType: [type, [Validators.required]],
      name: [null, [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(60)]],
      choice: this.fb.array([]),
      required: [true, []],
      description: [{value: '', disabled: true}, [Validators.maxLength(120)]]
    });
  }
}
