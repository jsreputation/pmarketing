import { ChangeDetectorRef, Directive, HostListener, Input } from '@angular/core';
import { QuestionFormFieldService } from './services/question-form-field.service';

@Directive({
  selector: '[clOpenClose]'
})
export class OpenCloseDirective {
  private index: any;
  @Input() public set clOpenClose(val) {
    this.index = val;
  }

  constructor(private questionFormFieldService: QuestionFormFieldService) { }

  @HostListener('click', ['$event']) public onClick(e) {
    e.stopPropagation();
    this.questionFormFieldService.focusedElem = this.index;
  }
}
