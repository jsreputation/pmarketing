import { Component, Input } from '@angular/core';
import { IProfile } from '../profile.model';

@Component({
  selector: 'perx-core-micro-profile',
  templateUrl: './micro-profile.component.html',
  styleUrls: ['./micro-profile.component.scss']
})

export class MicroProfileComponent {

  @Input()
  public profile: IProfile;

}
