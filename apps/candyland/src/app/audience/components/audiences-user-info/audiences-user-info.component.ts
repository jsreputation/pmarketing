import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'cl-audiences-user-info',
  templateUrl: './audiences-user-info.component.html',
  styleUrls: ['./audiences-user-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AudiencesUserInfoComponent {

  @Input() public user: any;
}
