import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { debounceTime, tap, map, switchMap } from 'rxjs/operators';
import { NewSurveyForm } from 'src/app/engagements/new-survey/new-survey-form';
import { ControlsName } from '../../../../models/controls-name';
import { AvailableNewEngagementService, RoutingStateService, SettingsService, SurveyService } from '@cl-core/services';
import { QuestionFormFieldService } from '@cl-shared';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { ImageControlValue } from '@cl-helpers/image-control-value';
import { Tenants } from '@cl-core/http-adapters/setting-json-adapter';
import { SettingsHttpAdapter } from '@cl-core/http-adapters/settings-http-adapter';
import { IQuestion, SurveyQuestionType } from '@perx/core';
import { EngagementHttpAdapter } from '@cl-core/http-adapters/engagement-http-adapter';
import { CreateImageDirective } from '@cl-shared/directives/create-image.directive';

@Component({
  selector: 'cl-new-survey',
  templateUrl: './new-survey.component.html',
  styleUrls: ['./new-survey.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewSurveyComponent implements OnInit, OnDestroy {
  @ViewChild(CreateImageDirective, {static: false}) public createImagePreview: CreateImageDirective;
  public id: string;
  public form: FormGroup;
  public surveyQuestionType: IEngagementType[];
  public surveyData: any;
  public level = 0;
  public subHeadlineMaxLength: number = 250;

  public questionData$ = new Subject();
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

  constructor(private questionFormFieldService: QuestionFormFieldService,
              private availableNewEngagementService: AvailableNewEngagementService,
              private surveyService: SurveyService, private route: ActivatedRoute,
              private router: Router, private routingState: RoutingStateService,
              private cd: ChangeDetectorRef, private settingsService: SettingsService) {
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
      .pipe(untilDestroyed(this))
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
  }

  public patchForm(data?): void {

    // patch first simple fields fo the form
    this.form.patchValue(data, {emitEvent: false});

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

  public patchGroup(item: IQuestion, mainGroup: FormGroup): void {
    if (item.payload.type === SurveyQuestionType.questionGroup) {
      item.payload.questions.forEach((item) => {
        const group = this.groupPatchHandler(item);
        (mainGroup.get('payload.questions') as FormArray).push(group);
      });
    }
  }

  public groupPatchHandler(item: IQuestion): FormGroup {
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
    this.createImagePreview.getPreviewUrl()
      .pipe(
        switchMap((imageUrl: IUploadedFile) => {
          if (this.id) {
            return this.surveyService.updateSurvey(this.id, {...this.form.value, image_url: imageUrl.url});
          }
          return this.surveyService.createSurvey({...this.form.value, image_url: imageUrl.url}).pipe(
            map((engagement: IResponseApi<IEngagementApi>) => EngagementHttpAdapter.transformEngagement(engagement.data)),
            tap((data: IEngagement) => this.availableNewEngagementService.setNewEngagement(data))
          );
        })
      )
      .pipe(untilDestroyed(this))
      .subscribe(() => this.router.navigateByUrl('/engagements'));
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

  private patchMultipleChoice(item: any, group: FormGroup): void {
    if (item.payload.type === SurveyQuestionType.multipleChoice) {
      this.questionFormFieldService.patchMultipleChoice(item, group);
    }
  }

  private pathChoicePicture(item: IQuestion, group: FormGroup): void {
    if (item.payload.type === SurveyQuestionType.pictureChoice) {
      this.questionFormFieldService.pathChoicePicture(item, group);
    }
  }

  private createControlQuestion(questionType: SurveyQuestionType): FormGroup {
    return this.questionFormFieldService.createFormField(questionType);
  }

  private initForm(): void {
    this.form = NewSurveyForm.getForm();
    // this.addQuestion(SurveyQuestionType.rating);
  }

  private getSurveyData(): any {
    return this.surveyService.getSurveyData();
  }

  private subscribeFormValueChanges(): void {
    this.form.valueChanges
      .pipe(debounceTime(500), untilDestroyed(this))
      .subscribe((val) => {
        this.questionData$.next({questions: [val.questions[0]]});
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
        untilDestroyed(this),
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
