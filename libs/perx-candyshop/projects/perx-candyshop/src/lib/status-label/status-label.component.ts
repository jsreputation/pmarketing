import { Component, Input, OnChanges } from '@angular/core';
import { IStatusLabelConfig, StatusLabelConfigItem } from './status-label.interface';
import { StatusType } from '../../models/status-type.enum';

export const DEFAULT_STATUS_LABEL_CONFIG: IStatusLabelConfig  = {
  [StatusType.DRAFT]: {title: 'Draft', class: 'draft'},
  [StatusType.ACTIVE]: {title: 'Active', class: 'active'},
  [StatusType.PROCESSED]: {title: 'Processed', class: 'processed'},
  [StatusType.FAILED]: {title: 'Failed', class: 'failed'},
  [StatusType.INACTIVE]: {title: 'Inactive', class: 'inactive'},
  [StatusType.PENDING]: {title: 'Pending', class: 'pending'},
  [StatusType.SCHEDULED]: {title: 'Scheduled', class: 'scheduled'},
  [StatusType.PAUSED]: {title: 'Paused', class: 'paused'},
  [StatusType.ENDED]: {title: 'Ended', class: 'ended'},
};

@Component({
  selector: 'cs-status-label',
  templateUrl: './status-label.component.html',
  styleUrls: ['./status-label.component.scss'],
})

export class StatusLabelComponent implements OnChanges {
  @Input() public status: StatusType = StatusType.DRAFT;
  @Input() public config: IStatusLabelConfig = DEFAULT_STATUS_LABEL_CONFIG;
  public statusConfig: StatusLabelConfigItem;

  public ngOnChanges(): void {
    this.statusConfig = this.config[this.status];
  }
}
