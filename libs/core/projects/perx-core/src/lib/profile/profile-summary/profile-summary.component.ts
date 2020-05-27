import { ChangeDetectionStrategy, Component, HostListener, Input, OnInit } from '@angular/core';
import { IProfile } from '../profile.model';
import { ILoyalty } from '../../loyalty/models/loyalty.model';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'perx-core-profile-summary',
  templateUrl: './profile-summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./profile-summary.component.scss']
})
export class ProfileSummaryComponent implements OnInit {
  @Input()
  public profile$: Observable<IProfile>;

  @Input()
  public profileImg: string;

  @Input()
  public loyalty$: Observable<ILoyalty>;

  @Input()
  public titleFn: (profile: IProfile) => Observable<string>;

  @Input()
  public memberFn: (membershipTierName: string) => Observable<string>;

  @HostListener('click', ['$event'])
  public gotoProfile(_: Event): void {
    this.router.navigateByUrl('profile');
  }

  public constructor(private router: Router) { }

  public ngOnInit(): void {
    if (!this.titleFn) {
      this.titleFn = (profile?: IProfile): Observable<string> => {
        if (profile && profile.customProperties && profile.customProperties.nickname) {
          return of(`${profile.customProperties.nickname}`);
        }
        if (profile && profile.firstName) {
          return of(`${profile.firstName}`);
        }
        if (profile && profile.lastName) {
          return of(`${profile.lastName}`);
        }
        return of('');
      };
    }
    if (!this.memberFn) {
      this.memberFn = (membershipTierName: string) => of(`${membershipTierName} member`);
    }
  }

}
