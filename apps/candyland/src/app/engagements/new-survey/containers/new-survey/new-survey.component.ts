import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { combineLatest, Observable, of, Subject } from 'rxjs';
import { debounceTime, tap, map, switchMap, takeUntil } from 'rxjs/operators';

import { NewSurveyForm } from 'src/app/engagements/new-survey/new-survey-form';
import { ControlsName } from '../../../../models/controls-name';
import { AvailableNewEngagementService, RoutingStateService, SettingsService, SurveyService } from '@cl-core/services';
import { QuestionFormFieldService, SimpleMobileViewComponent } from '@cl-shared';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ImageControlValue } from '@cl-helpers/image-control-value';
import { Tenants } from '@cl-core/http-adapters/setting-json-adapter';
import { SettingsHttpAdapter } from '@cl-core/http-adapters/settings-http-adapter';
import { IWQuestion, WSurveyQuestionType } from '@perx/whistler';
import { EngagementHttpAdapter } from '@cl-core/http-adapters/engagement-http-adapter';

@Component({
  selector: 'cl-new-survey',
  templateUrl: './new-survey.component.html',
  styleUrls: ['./new-survey.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewSurveyComponent implements OnInit, OnDestroy {
  @ViewChild(SimpleMobileViewComponent, { static: false }) public simpleMobileViewComponent: SimpleMobileViewComponent;

  private destroy$: Subject<any> = new Subject();

  public id: string;
  public form: FormGroup;
  public surveyQuestionType: IEngagementType[];
  public surveyData: any;
  public level: number = 0;
  public subHeadlineMaxLength: number = 250;

  public questionData$: Subject<any> = new Subject();
  public tenantSettings: ITenantsProperties;

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

  constructor(
    private questionFormFieldService: QuestionFormFieldService,
    private availableNewEngagementService: AvailableNewEngagementService,
    private surveyService: SurveyService,
    private route: ActivatedRoute,
    private router: Router,
    private routingState: RoutingStateService,
    private cd: ChangeDetectorRef,
    private settingsService: SettingsService
  ) {
  }

  // tslint:disable
  public get listId(): string {
    const id = this.questionFormFieldService.listId;
    this.questionFormFieldService.listId = id;
    return id;
  }

  public getImgLink(control: FormControl, defaultImg: string): string {
    return ImageControlValue.getImgLink(control, defaultImg);
  }

  public getQuestionData(): Observable<any> {
    return this.questionData$.asObservable();
  }

  public ngOnInit(): void {
    this.getTenants();
    this.initForm();
    this.subscribeFormValueChanges();
    combineLatest([this.getSurveyData(), this.handleRouteParams()])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([surveyData, question]) => {
        this.surveyData = surveyData;
        // remove default value if we edit the existing question
        if (question) {
          this.deleteQuestion(0);
        }

        const patchData = question || this.getDefaultValue(surveyData);

        this.patchForm(patchData);
        this.cd.detectChanges();
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public patchForm(data?): void {

    // patch first simple fields fo the form
    this.form.patchValue(data, { emitEvent: false });

    // patch other form fields
    if (data.questions) {
      this.patchQuestionGroups(data.questions);
    }

  }

  public patchQuestionGroups(array: any[]): void {
    array.forEach((item) => {
      const group = this.groupPatchHandler(item);
      this.surveyQuestion.push(group);
    });
  }

  public patchGroup(item: IWQuestion, mainGroup: FormGroup): void {
    if (item.payload.type === WSurveyQuestionType.questionGroup) {
      item.payload.questions.forEach((item) => {
        const group = this.groupPatchHandler(item);
        (mainGroup.get('payload.questions') as FormArray).push(group);
      });
    }
  }

  public groupPatchHandler(item: IWQuestion): FormGroup {
    const group = this.createControlQuestion(item.payload.type);
    this.pathChoicePicture(item, group);
    this.patchMultipleChoice(item, group);
    this.patchGroup(item, group);
    group.patchValue(item);
    return group;
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
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.simpleMobileViewComponent.createPreview()
      .pipe(
        switchMap((imageUrl: IUploadedFile) => {
          if (this.id) {
            return this.surveyService.updateSurvey(this.id, { ...this.form.value, image_url: imageUrl.url });
          }
          return this.surveyService.createSurvey({ ...this.form.value, image_url: imageUrl.url }).pipe(
            map((engagement: IResponseApi<IEngagementApi>) => EngagementHttpAdapter.transformEngagement(engagement.data)),
            tap((data: IEngagement) => this.availableNewEngagementService.setNewEngagement(data))
          );
        })
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.router.navigateByUrl('/engagements'));
  }

  public deleteQuestion(index: number) {
    this.surveyQuestion.removeAt(index);
  }

  public updateQuestionType(data: { index: number, selectedTypeQuestion: WSurveyQuestionType }): void {
    this.deleteQuestion(data.index);
    this.surveyQuestion.insert(data.index, this.createControlQuestion(data.selectedTypeQuestion));
  }

  public choseTypeQuestion(selectedTypeQuestion: WSurveyQuestionType): void {
    this.addQuestion(selectedTypeQuestion);
  }

  public addQuestion(questionType: WSurveyQuestionType): void {
    this.surveyQuestion.push(this.createControlQuestion(questionType));
  }

  private patchMultipleChoice(item: any, group: FormGroup): void {
    if (item.payload.type === WSurveyQuestionType.multipleChoice) {
      this.questionFormFieldService.patchMultipleChoice(item, group);
    }
  }

  private pathChoicePicture(item: IWQuestion, group: FormGroup): void {
    if (item.payload.type === WSurveyQuestionType.pictureChoice) {
      this.questionFormFieldService.pathChoicePicture(item, group);
    }
  }

  private createControlQuestion(questionType: WSurveyQuestionType): FormGroup {
    return this.questionFormFieldService.createFormField(questionType);
  }

  private initForm(): void {
    this.form = NewSurveyForm.getForm();
  }

  private getSurveyData(): any {
    return this.surveyService.getSurveyData();
  }

  private subscribeFormValueChanges(): void {
    this.form.valueChanges
      .pipe(debounceTime(500), takeUntil(this.destroy$))
      .subscribe((val) => {
        this.questionData$.next({ questions: [val.questions[0]] });
        this.cd.detectChanges();
      });
  }

  private getTenants(): void {
    this.settingsService.getTenants()
      .subscribe((res: Tenants) => {
        this.tenantSettings = SettingsHttpAdapter.getTenantsSettings(res);
        this.cd.detectChanges();
      });
  }

  private handleRouteParams(): Observable<any> {
    return this.route.paramMap
      .pipe(
        takeUntil(this.destroy$),
        map((params: ParamMap) => params.get('id')
        ),
        tap(id => this.id = id),
        switchMap(id => {
          if (id) {
            return this.surveyService.getSurvey(id);
          }
          return of(null);
        })
      );
  }

  private getDefaultValue(queryData: any): any {
    return NewSurveyForm.getDefaultValue(queryData);
  }
}
