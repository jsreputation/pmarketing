import { Component, Input } from '@angular/core';
import { IProfile } from '../../profile/profile.model';

@Component({
  selector: 'perx-core-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {

  @Input() public profile: IProfile;

}
