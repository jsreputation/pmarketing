import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { Role } from '@cl-helpers/role.enum';

export interface RoleLabelConfig {
  abbr: string;
  title: string;
  class: string;
}

@Component({
  selector: 'cl-role-label',
  templateUrl: './role-label.component.html',
  styleUrls: ['./role-label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class RoleLabelComponent implements OnChanges {
  @Input() public role: Role = Role.ADMIN;
  @Input() public showTitle = false;
  public roleConfig: RoleLabelConfig;
  private config: { [key: string]: RoleLabelConfig } = {
    [Role.ADMIN]: {abbr: 'A', title: 'Admin', class: 'admin'},
    [Role.CREATOR]: {abbr: 'C', title: 'Creator', class: 'creator'},
    [Role.CUSTOMER]: {abbr: 'CS', title: 'Customer Support', class: 'customer'},
    [Role.MANAGER]: {abbr: 'M', title: 'Manager', class: 'manager'},
    [Role.VIEWER]: {abbr: 'V', title: 'Viewer', class: 'viewer'}
  };

  ngOnChanges(): void {
    this.roleConfig = this.config[this.role];
    console.log(this.role);
  }
}
