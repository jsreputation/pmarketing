import { Directive, HostListener, Input } from '@angular/core';
import { QuestionFormFieldService } from 'src/app/shared/questions/question-form-field/shared/services/question-form-field.service';

@Directive({
  selector: '[clOpenClose]'
})
export class OpenCloseDirective {
  private index: any;
  @Input() public set clOpenClose(val: number) {
    this.index = val;
  }

  constructor(private questionFormFieldService: QuestionFormFieldService) { }

  @HostListener('click', ['$event']) public onClick(e: Event): void {
    e.stopPropagation();
    this.questionFormFieldService.focusedElem = this.index;
  }
}
