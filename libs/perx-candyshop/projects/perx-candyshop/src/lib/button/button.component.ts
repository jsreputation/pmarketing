import { Component, Input } from '@angular/core';

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

}
