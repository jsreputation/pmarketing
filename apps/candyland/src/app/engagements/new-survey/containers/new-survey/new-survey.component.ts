import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { ControlsName } from '../../../../models/controls-name';
import { SurveyService } from '@cl-core/services';
import { ConfirmModalComponent, QuestionFormFieldService } from '@cl-shared';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

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
export class NewSurveyComponent implements OnInit, OnDestroy {
  public formSurvey: FormGroup;
  public surveyQuestionType: IEngagementType[];
  public surveyData$: Observable<any>;
  public level = 0;
  private destroy$ = new Subject();
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
              private surveyService: SurveyService,
              private router: Router,
              public dialog: MatDialog) {
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
    return this.formSurvey.get(ControlsName.name);
  }

  public get headlineMessage(): AbstractControl {
    return this.formSurvey.get(ControlsName.headlineMessage);
  }

  public get subHeadlineMessage(): AbstractControl {
    return this.formSurvey.get(ControlsName.subHeadlineMessage);
  }

  public get buttonText(): AbstractControl {
    return this.formSurvey.get(ControlsName.buttonText);
  }

  public get surveyQuestion(): FormArray {
    return (this.formSurvey.get('questions') as FormArray);
  }

  public get color(): AbstractControl {
    return this.formSurvey.get('color');
  }

  ngOnInit() {
    this.createSurveyForm();
    this.getSurveyData();
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
    this.showLaunchDialog();
  }

  public showLaunchDialog(): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
    });

    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(result => {
        if (result) {
          this.router.navigateByUrl('/engagements');
        }
      });
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

  private getSurveyData(): void {
    this.surveyData$ = this.surveyService.getSurveyData()
      .pipe(tap((res) => {
        this.formSurvey.patchValue({
          background: res.background[0],
          cardBackground: res.cardBackground[0],
        });
      }));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
