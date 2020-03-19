import { ChangeDetectorRef, Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IWQuestion, WSurveyQuestionType } from '@perxtech/whistler';

@Injectable()
export class QuestionFormFieldService {
  public focusedElementIndex: any;
  public cd: ChangeDetectorRef;
  public listIdDrag: string[] = [];
  private descriptionFieldMaxLength: number = 1024;

  private formControls: { [key: string]: any } = {
    [WSurveyQuestionType.rating]: (type) => this.ratingGroup(type),
    [WSurveyQuestionType.date]: (type) => this.dateGroup(type),
    [WSurveyQuestionType.phone]: (type) => this.phoneGroup(type),
    [WSurveyQuestionType.questionGroup]: (type) => this.questionGroup(type),
    [WSurveyQuestionType.longText]: (type) => this.questionLongText(type),
    [WSurveyQuestionType.pictureChoice]: (type) => this.questionPictureChoice(type),
    [WSurveyQuestionType.multipleChoice]: (type) => this.questionMultipleChoice(type)
  };
  private idCounter: number = 0;

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

  public createFormField(type: WSurveyQuestionType): FormGroup {
    return this.formControls[type](type);
  }

  public patchMultipleChoice(item: IWQuestion, group: FormGroup): void {
    const choices = (this.getChoices('payload.choices', group) as FormArray);
    this.removeFirsElement(choices);

    item.payload.choices.forEach((dataChoice) => {
      choices.push(this.fb.control(
        dataChoice, [Validators.required]
      ));
    });
  }

  public pathChoicePicture(item: IWQuestion, group: FormGroup): void {
    const choices = (this.getChoices('payload.choices', group) as FormArray);
    this.removeFirsElement(choices);

    item.payload.choices.forEach((dataChoice) => {
      choices.push(this.fb.group({
        text: [dataChoice, [Validators.required]],
        img_url: [dataChoice.img_url, [Validators.required]]
      }));
    });
  }

  private getChoices(field: string, group: FormGroup): AbstractControl {
    return group.get(field);
  }

  private removeFirsElement(formArray: FormArray): void {
    if (formArray) {
      formArray.removeAt(0);
    }
  }

  private ratingGroup(type: string): FormGroup {
    return this.fb.group({
      id: [this.idCounter],
      selectedType: [type, [Validators.required]],
      question: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(128)]],
      required: [true, []],
      description: [{ value: '', disabled: true }, [Validators.maxLength(this.descriptionFieldMaxLength)]],
      payload: this.fb.group({
        type: ['rating', [Validators.required]],
        scale: [5, []],
        shape: ['star', []],
        color: ['primary', []],
        left_label: ['Not Very', [Validators.maxLength(25)]],
        right_label: ['Very much', [Validators.maxLength(25)]]
      })
    });
  }

  private dateGroup(type: string): FormGroup {
    return this.fb.group({
      id: [this.idCounter],
      selectedType: [type, [Validators.required]],
      question: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(128)]],
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
      question: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(128)]],
      required: [true, []],
      description: [{ value: '', disabled: true }, [Validators.maxLength(this.descriptionFieldMaxLength)]],
      payload: this.fb.group({
        type: [type, [Validators.required]],
        // tslint:disable
        default_country_code: [null, [Validators.minLength(2), Validators.maxLength(4)]]
      })
    });
  }

  private questionGroup(type: string): FormGroup {
    return this.fb.group({
      id: [this.idCounter],
      selectedType: [type, [Validators.required]],
      question: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(128)]],
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
        choices: this.fb.array([]),
        multiple: [false]
      })
    });
  }

  private questionMultipleChoice(type: string): FormGroup {
    return this.fb.group({
      id: [this.idCounter],
      selectedType: [type, [Validators.required]],
      question: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(128)]
      ],
      required: [true, []],
      description: [{ value: '', disabled: true }, [Validators.maxLength(this.descriptionFieldMaxLength)]],
      payload: this.fb.group({
        type: [type],
        choices: this.fb.array([]),
        multiple: [false]
      })
    });
  }
}
