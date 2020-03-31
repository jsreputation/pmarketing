import {
  Component,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

import Utils from '@cl-helpers/utils';
import { IAudiencesUserForm } from '@cl-core/models/audiences/user.interface';

@Component({
  selector: 'cl-audiences-user-info',
  templateUrl: './audiences-user-info.component.html',
  styleUrls: ['./audiences-user-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AudiencesUserInfoComponent {
  @Input() public user: IAudiencesUserForm;

  public transformMailTo(email: string): string {
    return Utils.transformMailTo(email);
  }

  public transformTelTo(tel: string): string {
    return Utils.transformTelTo(tel);
  }
}
