import { Component, OnInit, Input } from '@angular/core';
import { IProfile } from '../profile.model';

@Component({
  selector: 'perx-core-micro-profile',
  templateUrl: './micro-profile.component.html',
  styleUrls: ['./micro-profile.component.scss']
})

export class MicroProfileComponent implements OnInit {

  @Input()
  public profile: IProfile;

  public ngOnInit(): void {
  }

}
