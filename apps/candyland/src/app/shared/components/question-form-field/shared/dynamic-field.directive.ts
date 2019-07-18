import { ComponentFactoryResolver, Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionRatingFieldComponent } from '@cl-shared/components/question-rating-field/question-rating-field.component';
import { QuestionDateFieldComponent } from '@cl-shared/components/question-date-field/question-date-field.component';
import { QuestionCountryCodeFieldComponent } from '@cl-shared/components/question-country-code-field/question-country-code-field.component';
import { QuestionGroupFieldComponent } from '@cl-shared/components/question-group-field/question-group-field.component';
const componentMapper = {
  rating: QuestionRatingFieldComponent,
  date: QuestionDateFieldComponent,
  phone: QuestionCountryCodeFieldComponent,
  questionGroup: QuestionGroupFieldComponent
};
@Directive({
  // tslint:disable-next-line
  selector: '[clDynamicField]'
})
export class DynamicFieldDirective implements OnInit {
  @Input() group: FormGroup;
  @Input() type: string;
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
    const factory = this.resolver.resolveComponentFactory(componentMapper[this.type]);
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.group = this.group;
  }

}
