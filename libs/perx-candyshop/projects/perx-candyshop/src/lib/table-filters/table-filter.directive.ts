import { Directive, Input, TemplateRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[clTableFilter]'
})
export class TableFilterDirective {
  @Input('clTableFilter') public name: string;
  @Input('clTableFilterValue') public value: any;
  constructor(public template: TemplateRef<{ $implicit: AbstractControl }>) {}
}
