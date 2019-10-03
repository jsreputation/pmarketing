import { ComponentFactoryResolver, Directive, Input, OnChanges, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionRatingFieldComponent } from '@cl-shared/questions/question-rating-field/question-rating-field.component';
import { QuestionDateFieldComponent } from '@cl-shared/questions/question-date-field/question-date-field.component';
import { QuestionCountryCodeFieldComponent } from '@cl-shared/questions/question-country-code-field/question-country-code-field.component';
import { QuestionGroupFieldComponent } from '@cl-shared/questions/question-group-field/question-group-field.component';
import { QuestionLongTextFieldComponent } from '@cl-shared/questions/question-long-text-field/question-long-text-field.component';
import {
  QuestionPictureChoiceFieldComponent
} from '@cl-shared/questions/question-picture-choice-field/question-picture-choice-field.component';
import {
  QuestionMultipleChoiceFieldComponent
} from '@cl-shared/questions/question-multiple-choice-field/question-multiple-choice-field.component';
import { SurveyQuestionType } from '@perx/core';

const componentMapper = {
  [SurveyQuestionType.rating]: QuestionRatingFieldComponent,
  [SurveyQuestionType.date]: QuestionDateFieldComponent,
  [SurveyQuestionType.phone]: QuestionCountryCodeFieldComponent,
  [SurveyQuestionType.questionGroup]: QuestionGroupFieldComponent,
  [SurveyQuestionType.longText]: QuestionLongTextFieldComponent,
  [SurveyQuestionType.pictureChoice]: QuestionPictureChoiceFieldComponent,
  [SurveyQuestionType.multipleChoice]: QuestionMultipleChoiceFieldComponent
};

@Directive({
  // tslint:disable-next-line
  selector: '[clDynamicField]'
})
export class DynamicFieldDirective implements OnInit, OnChanges {
  @Input() public group: FormGroup;
  @Input() public type: string;
  @Input() public level: number;
  @Input() public currentIndex: number;
  public componentRef: any;

  constructor(private resolver: ComponentFactoryResolver,
              private container: ViewContainerRef) {
  }

  public ngOnInit(): void {
    this.createComponentFactory();
  }

  private createComponentFactory(): void {
    if (!this.type) {
      return;
    }
    this.clear();
    const factory = this.resolver.resolveComponentFactory(componentMapper[this.type]);
    this.componentRef = this.container.createComponent(factory);

    if (this.type === SurveyQuestionType.questionGroup) {
      this.componentRef.instance.group = this.group;
      this.setSettingsForGroup();
    } else {
      this.componentRef.instance.group = this.group.get('payload');
    }
  }

  private setSettingsForGroup(): void {
    this.componentRef.instance.level = this.level;
    this.componentRef.instance.currentIndex = this.currentIndex;
  }

  private clear(): void {
    this.container.clear();
  }

  public ngOnChanges(): void {
    this.createComponentFactory();
  }

}
