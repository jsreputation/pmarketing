import { Observable, of } from 'rxjs';
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
  @Input()
  public playerCodeFn: () => Observable<string>
  @Input()
  public last4DigitFn: () => Observable<string>

  public ngOnInit(): void {
    if(!this.playerCodeFn) {
      this.playerCodeFn = () => of('Player Code');
    }
    if(!this.last4DigitFn) {
      this.last4DigitFn = () => of('Card Last 4 Digit');
    }
  }
}
