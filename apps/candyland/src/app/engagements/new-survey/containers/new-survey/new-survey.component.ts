import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionFormFieldService } from '@cl-shared/components/question-form-field/shared/services/question-form-field.service';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StampHttpService } from '@cl-core/http-services/stamp-http.service';

export enum SurveyQuestionType {
  rating = 'rating',
  pictureChoice = 'pictureChoice',
  longText = 'longText',
  multipleChoice = 'multipleChoice',
  questionGroup = 'questionGroup',
  date = 'date', phone = 'phone'
}

@Component({
  selector: 'cl-new-survey',
  templateUrl: './new-survey.component.html',
  styleUrls: ['./new-survey.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewSurveyComponent implements OnInit {
  public formSurvey: FormGroup;
  public surveyQuestionType: IEngagementType[];
  public cardBackground$: Observable<IGraphic[]>;
  public backgrounds$: Observable<IGraphic[]>;
  public level = 0;
  // tslint:disable
  private data = {
    name: 'Create Shake the Tree Template',
    'headlineMessage': 'headlineMessage',
    'subHeadlineMessage': 'subHeadlineMessage',
    questions: [{
      selectedType: 'rating',
      name: null,
      'scale': '5',
      'selectShape': 'star',
      'selectColor': 'primary',
      'left': 'Not Very',
      'right': 'Very much',
      required: true
    },
      {"selectedType":"rating","name":null,"scale":"3","selectShape":"circle","selectColor":"warn","left":"66666666","right":"647+9879+/797*/79/","required":false,"description":"sersgtsdfgsdfgsdfgsdfg  a'psdjf;asdjf'[pasdj 'asodoj'apsdjf 'apsdojf"},
      {selectedType: 'pictureChoice', name: null, picture: [], required: true}, {
      selectedType: 'longText',
      name: null,
      'text': null,
      required: true
    }, {
      selectedType: 'questionGroup',
      name: null,
      questionGroup: [{
        selectedType: 'rating',
        name: null,
        scale: '5',
        selectShape: 'star',
        selectColor: 'primary',
        left: 'Not Very',
        right: 'Very much',
        required: true
      }
      , {selectedType: 'longText', name: null, text: null, required: true}, {
        selectedType: 'date',
        name: null,
        startDate: null,
        endDate: null,
        required: true
      }],
      required: true
    }],
    'color': 'primary',
    'cardBackground': {
      'id': 1,
      'type': 'card-bg-1',
      'title': 'icon',
      'img': 'assets/images/stamps/card-background/card-bg-1.png',
      'format': '.png',
      'active': 'false'
    },
    background: {
      id: 1,
      type: 'bg-1',
      title: 'icon',
      img: 'assets/images/stamps/background/stamp-bg-1.png',
      format: '.png',
      active: 'false'
    }
  };

  constructor(private fb: FormBuilder,
              private questionFormFieldService: QuestionFormFieldService,
              private stampService: StampHttpService) {
  }

  public get listId(): string {
    const id = this.questionFormFieldService.listId;
    this.questionFormFieldService.listId = id;
    return id;
  }

  public get listDropConnectedTo(): string[] {
    return this.questionFormFieldService.listIdDrag;
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

  public get surveyQuestion(): FormArray {
    return (this.formSurvey.get('questions') as FormArray);
  }

  public get color(): AbstractControl {
    return this.formSurvey.get('color');
  }

  ngOnInit() {
    this.createSurveyForm();
    this.getCardBackground();
    this.getBackground();
  }

  public patchForm(): void {
    this.formSurvey.patchValue(this.data);
    this.data.questions.forEach((item) => {
      const group = this.createControlQuestion(item.selectedType);
      group.patchValue(item);
      this.surveyQuestion.push(group);
    });
  }

  public drop(event: any): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  public save(): void {
    console.log('formSurvey.value', this.formSurvey.value);
  }

  public deleteQuestion(index: number) {
    this.surveyQuestion.removeAt(index);
  }

  public updateQuestionType(data: { index: number, selectedTypeQuestion: string }): void {
    this.deleteQuestion(data.index);
    this.surveyQuestion.insert(data.index, this.createControlQuestion(data.selectedTypeQuestion));
  }

  public choseTypeQuestion(selectedTypeQuestion: string): void {
    this.addQuestion(selectedTypeQuestion);
  }

  public addQuestion(questionType: string): void {
    this.surveyQuestion.push(this.createControlQuestion(questionType));
  }

  private createControlQuestion(questionType: string): FormGroup {
    return this.questionFormFieldService.createFormField(questionType);
  }

  private createSurveyForm(): void {
    this.formSurvey = this.fb.group({
      name: ['Create Shake the Tree Template', [Validators.required, Validators.minLength(1), Validators.maxLength(60)]],
      headlineMessage: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(60)]],
      subHeadlineMessage: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(60)]],
      questions: this.fb.array([]),
      color: ['primary', [Validators.required]],
      cardBackground: [null, [Validators.required]],
      background: [null, [Validators.required]],
    });
  }

  private getCardBackground(): void {
    this.cardBackground$ = this.stampService.getCardBackground()
      .pipe(tap((res) => {
        this.patchFieldForm('cardBackground', res[0]);
      }));
  }

  private getBackground(): void {
    this.backgrounds$ = this.stampService.getBackground()
      .pipe(tap((res) => {
        this.patchFieldForm('background', res[0]);
      }));
  }

  private patchFieldForm(fieldName: string, value: any): void {
    this.formSurvey.patchValue({
      [fieldName]: value
    });
  }
}
