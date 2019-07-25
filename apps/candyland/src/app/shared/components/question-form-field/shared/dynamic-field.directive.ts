import { ComponentFactoryResolver, Directive, Input, OnChanges, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionRatingFieldComponent } from '@cl-shared/components/question-rating-field/question-rating-field.component';
import { QuestionDateFieldComponent } from '@cl-shared/components/question-date-field/question-date-field.component';
import { QuestionCountryCodeFieldComponent } from '@cl-shared/components/question-country-code-field/question-country-code-field.component';
import { QuestionGroupFieldComponent } from '@cl-shared/components/question-group-field/question-group-field.component';
import { SurveyQuestionType } from '../../../../engagements/new-survey/containers/new-survey/new-survey.component';
import { QuestionLongTextFieldComponent } from '@cl-shared/components/question-long-text-field/question-long-text-field.component';
import {
  QuestionPictureChoiceFieldComponent
} from '@cl-shared/components/question-picture-choice-field/question-picture-choice-field.component';
import {
  QuestionMultipleChoiceFieldComponent
} from '@cl-shared/components/question-multiple-choice-field/question-multiple-choice-field.component';
const componentMapper = {
  rating: QuestionRatingFieldComponent,
  date: QuestionDateFieldComponent,
  phone: QuestionCountryCodeFieldComponent,
  questionGroup: QuestionGroupFieldComponent,
  longText: QuestionLongTextFieldComponent,
  pictureChoice: QuestionPictureChoiceFieldComponent,
  multipleChoice: QuestionMultipleChoiceFieldComponent
};
@Directive({
  // tslint:disable-next-line
  selector: '[clDynamicField]'
})
export class DynamicFieldDirective implements OnInit, OnChanges {
  @Input() group: FormGroup;
  @Input() type: string;
  @Input() public level: number;
  @Input() public currentIndex: number;
  componentRef: any;
  constructor(private resolver: ComponentFactoryResolver,
              private container: ViewContainerRef) { }

  ngOnInit() {
    this.createComponentFactory();
  }

  private createComponentFactory(): void {
    if (!this.type) {
      return;
    }
    this.clear();
    const factory = this.resolver.resolveComponentFactory(componentMapper[this.type]);
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.group = this.group;

    if (this.type === SurveyQuestionType.questionGroup) {
      this.setSettingsForGroup();
    }
  }

  private setSettingsForGroup(): void {
    this.componentRef.instance.level = this.level;
    this.componentRef.instance.currentIndex = this.currentIndex;
  }

  private clear(): void {
    this.container.clear();
  }

  ngOnChanges(): void {
    this.createComponentFactory();
  }

}
