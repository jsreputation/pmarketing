import {
  Component,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

import { IWCustomProperties } from '@perx/whistler';

@Component({
  selector: 'cl-audiences-user-info',
  templateUrl: './audiences-user-info.component.html',
  styleUrls: ['./audiences-user-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AudiencesUserInfoComponent {

  public get properties(): IWCustomProperties | null {
    if (!this.user) {
      return null;
    }

    return this.user.properties || null;
  }

  @Input() public user: any;
}
