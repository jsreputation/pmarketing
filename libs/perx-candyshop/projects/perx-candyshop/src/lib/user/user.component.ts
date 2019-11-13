import { Component, Input } from '@angular/core';

@Component({
  selector: 'cs-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  @Input() public isOpen: boolean;
  @Input() public user: IAMUser;
}
