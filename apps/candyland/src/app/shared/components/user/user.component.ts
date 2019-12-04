import { Component, Input } from '@angular/core';
import { IAMUser } from '@cl-core/models/settings/IAMUser.interface';

@Component({
  selector: 'cl-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  @Input() public isOpen: boolean;
  @Input() public user: IAMUser;
}
