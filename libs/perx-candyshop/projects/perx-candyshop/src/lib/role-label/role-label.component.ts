import { Component, Input, OnChanges } from '@angular/core';
import { IRoleLabelConfig, IRoleLabelConfigItem } from './role-label.interface';
import { RoleType } from './role-type.enum';

export const DEFAULT_ROLE_CONFIG: IRoleLabelConfig = {
  [RoleType.ADMIN]: {abbr: 'A', title: 'Admin', class: 'admin'},
  [RoleType.CREATOR]: {abbr: 'C', title: 'Creator', class: 'creator'},
  [RoleType.CUSTOMER]: {abbr: 'CS', title: 'Customer Support', class: 'customer'},
  [RoleType.MANAGER]: {abbr: 'M', title: 'Manager', class: 'manager'},
  [RoleType.VIEWER]: {abbr: 'V', title: 'Viewer', class: 'viewer'}
};

@Component({
  selector: 'cs-role-label',
  templateUrl: './role-label.component.html',
  styleUrls: ['./role-label.component.scss']
})
export class RoleLabelComponent implements OnChanges {
  @Input() public role: RoleType = RoleType.ADMIN;
  @Input() public showTitle: boolean = false;
  @Input() public email: string;
  @Input() public classList: string = '';
  @Input() public readonly config: IRoleLabelConfig = DEFAULT_ROLE_CONFIG;
  public roleConfig: IRoleLabelConfigItem;

  public ngOnChanges(): void {
    this.roleConfig = this.config[this.role];
  }
}
