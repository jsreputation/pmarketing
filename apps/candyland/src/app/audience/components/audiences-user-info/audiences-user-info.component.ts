import {
  Component,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

import { IWCustomProperties } from '@perx/whistler';
import Utils from '@cl-helpers/utils';

@Component({
  selector: 'cl-audiences-user-info',
  templateUrl: './audiences-user-info.component.html',
  styleUrls: ['./audiences-user-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AudiencesUserInfoComponent {
  @Input() public user: any;

  public get properties(): IWCustomProperties | null {
    if (!this.user) {
      return null;
    }

    return this.user.properties || null;
  }

  public transformMailTo(email: string): string {
    return Utils.transformMailTo(email);
  }

  public transformTelTo(tel: string): string {
    return Utils.transformTelTo(tel);
  }
}
