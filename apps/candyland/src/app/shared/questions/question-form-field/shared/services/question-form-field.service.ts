import { ChangeDetectorRef, Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IQuestion, SurveyQuestionType } from '@perx/core';

@Injectable()
export class QuestionFormFieldService {
  public focusedElementIndex: any;
  public cd: ChangeDetectorRef;
  public listIdDrag = [];
  private descriptionFieldMaxLength: number = 1024;

  private formControls = {
    [SurveyQuestionType.rating]: (type) => this.ratingGroup(type),
    [SurveyQuestionType.date]: (type) => this.dateGroup(type),
    [SurveyQuestionType.phone]: (type) => this.phoneGroup(type),
    [SurveyQuestionType.questionGroup]: (type) => this.questionGroup(type),
    [SurveyQuestionType.longText]: (type) => this.questionLongText(type),
    [SurveyQuestionType.pictureChoice]: (type) => this.questionPictureChoice(type),
    [SurveyQuestionType.multipleChoice]: (type) => this.questionMultipleChoice(type)
  };
  private idCounter = 0;

  constructor(private fb: FormBuilder) {
  }

  public get listId(): string {
    return `drag-list-id-${this.idCounter++}`;
  }

  public set listId(id: string) {
    this.listIdDrag.push(id);
  }

  public set focusedElem(val: any) {
    this.focusedElementIndex = val.toString();
  }

  public getFocusedElem(index: number, level: number): any {
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

  public createFormField(type: SurveyQuestionType): FormGroup {
    return this.formControls[type](type);
  }

  public pathChoicePicture(item: IQuestion, group: FormGroup): void {
    const choices = (group.get('payload.choices') as FormArray);
    choices.removeAt(0);

    item.payload.choices.forEach((dataChoice) => {
      choices.push(this.fb.group({
        text: [dataChoice, [Validators.required]],
        img_url: [dataChoice.img_url, [Validators.required]]
      }));
    });
  }

  private ratingGroup(type: string): FormGroup {
    return this.fb.group({
      id: [this.idCounter],
      selectedType: [type, [Validators.required]],
      question: [null, [Validators.required,
      Validators.minLength(1),
      Validators.maxLength(128)]],
      required: [true, []],
      description: [{ value: '', disabled: true }, [Validators.maxLength(this.descriptionFieldMaxLength)]],
      payload: this.fb.group({
        type: ['rating', [Validators.required]],
        scale: [5, []],
        shape: ['star', []],
        color: ['primary', []],
        left_label: ['Not Very', [Validators.maxLength(10)]],
        right_label: ['Very much', [Validators.maxLength(10)]]
      })
    });
  }

  private dateGroup(type: string): FormGroup {
    return this.fb.group({
      id: [this.idCounter],
      selectedType: [type, [Validators.required]],
      question: [null, [Validators.required,
      Validators.minLength(1),
      Validators.maxLength(128)]],
      required: [true, []],
      description: [{ value: '', disabled: true }, [Validators.maxLength(this.descriptionFieldMaxLength)]],
      payload: this.fb.group({
        type: [type, [Validators.required]],
        period: [false]
      })
    });
  }

  private phoneGroup(type: string): FormGroup {
    return this.fb.group({
      id: [this.idCounter],
      selectedType: [type, [Validators.required]],
      question: ['', [Validators.required,
      Validators.minLength(1),
      Validators.maxLength(128)]],
      required: [true, []],
      description: [{ value: '', disabled: true }, [Validators.maxLength(this.descriptionFieldMaxLength)]],
      payload: this.fb.group({
        type: [type, [Validators.required]],
        // tslint:disable
        'default_country_code': [null, [Validators.minLength(2), Validators.maxLength(4)]]
      })
    });
  }

  private questionGroup(type: string): FormGroup {
    return this.fb.group({
      id: [this.idCounter],
      selectedType: [type, [Validators.required]],
      question: ['', [Validators.required,
      Validators.minLength(1),
      Validators.maxLength(128)]],
      required: [true, []],
      description: [{ value: '', disabled: true }, [Validators.maxLength(this.descriptionFieldMaxLength)]],
      payload: this.fb.group({
        type: [type, [Validators.required]],
        questions: this.fb.array([])
      })
    });
  }

  private questionLongText(type: string): FormGroup {
    return this.fb.group({
      id: [this.idCounter],
      selectedType: [type, [Validators.required]],
      question: ['', [
        // Validators.required,
        Validators.minLength(1),
        Validators.maxLength(128)
      ]],
      required: [true, []],
      description: [{ value: '', disabled: true }, [Validators.maxLength(this.descriptionFieldMaxLength)]],
      payload: this.fb.group({
        type: [type],
        'max-length': [null, [
          // Validators.required,
          Validators.minLength(0),
          Validators.maxLength(1024)
        ]]
      })
    });
  }

  private questionPictureChoice(type: string): FormGroup {
    return this.fb.group({
      id: [this.idCounter],
      selectedType: [type, [Validators.required]],
      question: ['', [Validators.required,
      Validators.minLength(1),
      Validators.maxLength(128)]],
      required: [true, []],
      description: [{ value: '', disabled: true }, [Validators.maxLength(this.descriptionFieldMaxLength)]],
      payload: this.fb.group({
        type: [type],
        choices: this.fb.array([])
      })
    });
  }

  private questionMultipleChoice(type: string): FormGroup {
    return this.fb.group({
      id: [this.idCounter],
      selectedType: [type, [Validators.required]],
      question: ['', [Validators.required,
      Validators.minLength(1),
      Validators.maxLength(128)]],
      required: [true, []],
      description: [{ value: '', disabled: true }, [Validators.maxLength(this.descriptionFieldMaxLength)]],
      payload: this.fb.group({
        type: [type],
        choices: this.fb.array([])
      })
    });
  }
}
