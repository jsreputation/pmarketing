import { ComponentFactoryResolver, Directive, Input, OnChanges, OnInit, ViewContainerRef } from '@angular/core';
import { SurveyQuestionType } from '../../../../../../../../libs/perx-core/dist/perx-core';
import { RatingGraphicComponent } from '../../rating-graphic/rating-graphic.component';
import { PictureChoiceGraphicComponent } from '../../picture-choice-graphic/picture-choice-graphic.component';
import { MultipleChoiceGraphicComponent } from '../../multiple-choice-graphic/multiple-choice-graphic.component';
import { LongTextGraphicComponent } from '../../long-text-graphic/long-text-graphic.component';
import { QuestionGroupGraphicComponent } from '../../question-group-graphic/question-group-graphic.component';
const componentMapper = {
  [SurveyQuestionType.rating]: RatingGraphicComponent,
  [SurveyQuestionType.pictureChoice]: PictureChoiceGraphicComponent,
  [SurveyQuestionType.multipleChoice]: MultipleChoiceGraphicComponent,
  [SurveyQuestionType.longText]: LongTextGraphicComponent,
  [SurveyQuestionType.questionGroup]: QuestionGroupGraphicComponent,
};
@Directive({
  selector: '[clDynamicGraphic]'
})
export class DynamicGraphicDirective implements OnInit, OnChanges {
  public componentRef: any;
  @Input() public data: any;
  @Input() public type: string;
  @Input() public currentIndex: number;
  constructor(private resolver: ComponentFactoryResolver,
              private container: ViewContainerRef) {
  }

  public ngOnInit(): void {
    this.createComponentFactory();
  }

  private createComponentFactory(): void {
    if (!this.type || !componentMapper[this.type]) {
      return;
    }
    this.clear();
    const factory = this.resolver.resolveComponentFactory(componentMapper[this.type]);
    this.componentRef = this.container.createComponent(factory);

    if (this.type === SurveyQuestionType.questionGroup) {
      this.componentRef.instance.data = this.data;
      this.setSettingsForGroup();
    } else {
      this.componentRef.instance.data = this.data;
    }
  }
  private setSettingsForGroup(): void {
    this.componentRef.instance.currentIndex = this.currentIndex;
  }

  private clear(): void {
    this.container.clear();
  }

  public ngOnChanges(): void {
    this.createComponentFactory();
  }
}
