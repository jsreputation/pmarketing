import { Input, Component } from '@angular/core';

@Component({
  selector: '[disableForm]',
  styles: [`
    fieldset {
      display: block;
      margin: unset;
      padding: unset;
      border: unset;
    }
  `],
  template: `
    <fieldset [disabled]="disableForm">
      <ng-content></ng-content>
    </fieldset>
  `
})
export class DisableFormComponent {
  @Input('disableForm')
  public disableForm: boolean;

}
