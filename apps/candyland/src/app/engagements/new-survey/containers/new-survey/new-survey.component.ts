import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Observable, Subject } from 'rxjs';
import { debounceTime, tap, map } from 'rxjs/operators';
import { NewSurveyForm } from 'src/app/engagements/new-survey/new-survey-form';
import { ControlsName } from '../../../../models/controls-name';
import { AvailableNewEngagementService, RoutingStateService, SettingsService, SurveyService } from '@cl-core/services';
import { QuestionFormFieldService } from '@cl-shared';
import { Router } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { ImageControlValue } from '@cl-helpers/image-control-value';
import { Tenants } from '@cl-core/http-adapters/setting-json-adapter';
import { SettingsHttpAdapter } from '@cl-core/http-adapters/settings-http-adapter';
import { SurveyQuestionType } from '@perx/core';
import { EngagementHttpAdapter } from '@cl-core/http-adapters/engagement-http-adapter';

@Component({
  selector: 'cl-new-survey',
  templateUrl: './new-survey.component.html',
  styleUrls: ['./new-survey.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewSurveyComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public surveyQuestionType: IEngagementType[];
  public surveyData$: Observable<any>;
  public level = 0;
  public subHeadlineMaxLength: number = 250;

  public questionData$ = new Subject();
  public tenantSettings: ITenantsProperties;
  // tslint:disable
  public get listId(): string {
    const id = this.questionFormFieldService.listId;
    this.questionFormFieldService.listId = id;
    return id;
  }

  public get listDropConnectedTo(): string[] {
    return this.questionFormFieldService.listIdDrag;
  }

  public get name(): AbstractControl {
    return this.form.get(ControlsName.name);
  }

  public get headlineMessage(): AbstractControl {
    return this.form.get(ControlsName.headlineMessage);
  }

  public get subHeadlineMessage(): AbstractControl {
    return this.form.get(ControlsName.subHeadlineMessage);
  }

  public get buttonText(): AbstractControl {
    return this.form.get(ControlsName.buttonText);
  }

  public get surveyQuestion(): FormArray {
    return (this.form.get('questions') as FormArray);
  }

  public get color(): AbstractControl {
    return this.form.get('color');
  }

  public get background(): AbstractControl {
    return this.form.get('background');
  }

  public get cardBackground(): AbstractControl {
    return this.form.get('cardBackground');
  }

  public getImgLink(control: FormControl, defaultImg: string): string {
    return ImageControlValue.getImgLink(control, defaultImg);
  }

  public getQuestionData(): Observable<any> {
    return this.questionData$.asObservable();
  }

  constructor(private questionFormFieldService: QuestionFormFieldService,
    private availableNewEngagementService: AvailableNewEngagementService,
    private surveyService: SurveyService,
    private router: Router,
    private routingState: RoutingStateService,
    private cdr: ChangeDetectorRef,
    private settingsService: SettingsService) {
  }

  public ngOnInit(): void {
    this.initForm();
    this.getSurveyData();
    this.subscribeFormValueChanges();
    this.getTenants();
  }

  public ngOnDestroy(): void {
  }
  // TODO: need for the future patch form
  public patchForm(): void {
    const data = NewSurveyForm.getDefaultValue();
    this.form.patchValue(data);
    data.questions.forEach((item) => {
      const group = this.createControlQuestion(item.payload.type);
      group.patchValue(item);
      this.surveyQuestion.push(group);
    });
  }

  public comeBack(): void {
    this.routingState.comeBackPreviousUrl();
  }

  public drop(event: any): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  public save(): void {
    this.surveyService.createSurvey(this.form.value)
      .pipe(
        untilDestroyed(this),
        map((engagement: IResponseApi<IEngagementApi>) => EngagementHttpAdapter.transformEngagement(engagement.data))
      )
      .subscribe((data: IEngagement) => {
        this.availableNewEngagementService.setNewEngagement(data);
        this.router.navigateByUrl('/engagements');
      });
  }

  public deleteQuestion(index: number) {
    this.surveyQuestion.removeAt(index);
  }

  public updateQuestionType(data: { index: number, selectedTypeQuestion: SurveyQuestionType }): void {
    this.deleteQuestion(data.index);
    this.surveyQuestion.insert(data.index, this.createControlQuestion(data.selectedTypeQuestion));
  }

  public choseTypeQuestion(selectedTypeQuestion: SurveyQuestionType): void {
    this.addQuestion(selectedTypeQuestion);
  }

  public addQuestion(questionType: SurveyQuestionType): void {
    this.surveyQuestion.push(this.createControlQuestion(questionType));
  }

  private createControlQuestion(questionType: SurveyQuestionType): FormGroup {
    return this.questionFormFieldService.createFormField(questionType);
  }

  private initForm(): void {
    this.form = NewSurveyForm.getForm();
    // this.addQuestion(SurveyQuestionType.rating);
  }

  private getSurveyData(): void {
    this.surveyData$ = this.surveyService.getSurveyData()
      .pipe(tap((res) => {
        this.form.patchValue({
          background: res.background[0],
          cardBackground: res.cardBackground[0]
        }, { emitEvent: false });
      }));
  }

  private subscribeFormValueChanges(): void {
    this.form.valueChanges
      .pipe(
        debounceTime(500),
        untilDestroyed(this)
      )
      .subscribe((val) => {
        this.questionData$.next({ questions: [val.questions[0]] });
        this.cdr.detectChanges();
      })
  }

  private getTenants(): void {
    this.settingsService.getTenants()
      .subscribe((res: Tenants) => {
        this.tenantSettings = SettingsHttpAdapter.getTenantsSettings(res);
        this.cdr.detectChanges();
      });
  }
}
