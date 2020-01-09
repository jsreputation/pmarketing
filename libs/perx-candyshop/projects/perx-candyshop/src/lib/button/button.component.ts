import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'cs-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() public classList: string;
  @Input() public formId: string = 'primary';
  @Input() public disable: boolean;
  @Input() public disableRipple: boolean = false;
  @HostBinding('class.disable') public get disabledStatus(): boolean {
    return this.disable;
  }

}
