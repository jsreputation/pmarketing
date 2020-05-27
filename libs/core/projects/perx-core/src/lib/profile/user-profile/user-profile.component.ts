import { Component, OnInit, Input } from '@angular/core';
import { IProfile } from '../profile.model';

@Component({
  selector: 'perx-core-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  @Input()
  public profile: IProfile;

  public ngOnInit(): void {
  }
}
