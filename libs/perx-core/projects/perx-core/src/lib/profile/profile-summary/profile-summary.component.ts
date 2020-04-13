import {Component, Input, OnInit} from '@angular/core';
import {IProfile} from '../profile.model';
import {ILoyalty} from '../../loyalty/models/loyalty.model';


@Component({
  selector: 'perx-core-profile-summary',
  templateUrl: './profile-summary.component.html',
  styleUrls: ['./profile-summary.component.scss']
})
export class ProfileSummaryComponent implements OnInit {
  @Input()
  public profile: IProfile;

  @Input()
  public profileImg: string;

  @Input()
  public loyalty: ILoyalty;

  @Input()
  public titleFn: (profile: IProfile) => string;
  //
  // @HostListener('click', ['$event'])
  // public gotoProfile(_: Event): void {
  //   this.router.navigateByUrl('profile');
  // }

  public ngOnInit(): void {
    if (!this.titleFn) {
      this.titleFn = (profile?: IProfile): string => {
        if (profile && profile.customProperties && profile.customProperties.nickName) {
          return `${profile.customProperties.nickName}`;
        }
        if (profile && profile.firstName) {
          return `${profile.firstName}`;
        }
        if (profile && profile.lastName) {
          return `${profile.lastName}`;
        }
        return '';
      };
    }
  }

}
