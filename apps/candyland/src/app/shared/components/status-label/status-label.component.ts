import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { StatusLabel } from '@cl-helpers/status-label.enum';

export interface StatusLabelConfig {
  title: string;
  class: string;
}

@Component({
  selector: 'cl-status-label',
  templateUrl: './status-label.component.html',
  styleUrls: ['./status-label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class StatusLabelComponent implements OnChanges {
  @Input() public status: StatusLabel = StatusLabel.DRAFT;
  public statusConfig: StatusLabelConfig;
  @Input() public config: { [key: string]: StatusLabelConfig } = {
    [StatusLabel.DRAFT]: {title: 'Draft', class: 'draft'},
    [StatusLabel.ACTIVE]: {title: 'ACTIVE', class: 'active'},
    [StatusLabel.PROCESSED]: {title: 'Processed', class: 'processed'},
    [StatusLabel.FAILED]: {title: 'Failed', class: 'failed'},
    [StatusLabel.INACTIVE]: {title: 'Inactive', class: 'inactive'},
    [StatusLabel.PENDING]: {title: 'Pending', class: 'pending'},
    [StatusLabel.SCHEDULED]: {title: 'Scheduled', class: 'scheduled'},
    [StatusLabel.PAUSED]: {title: 'Paused', class: 'paused'},
    [StatusLabel.ENDED]: {title: 'Ended', class: 'ended'},
  };

  public ngOnChanges(): void {
    if (!this.status || !this.config) {
      return;
    }
    this.statusConfig = this.config[this.status];
  }
}
