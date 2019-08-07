import { Component, Input } from '@angular/core';

@Component({
  selector: 'cl-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() public classList;
  @Input() public formId = 'primary';
  @Input() public disable: boolean;
  @Input() public disableRipple = false;

}
