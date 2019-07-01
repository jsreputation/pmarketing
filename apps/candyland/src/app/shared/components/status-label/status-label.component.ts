import {ChangeDetectionStrategy, Component, Input, OnChanges} from '@angular/core';
import {StatusLabel} from "@cl-helpers/status-label.enum";

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
  private config: {[key: string]: StatusLabelConfig} = {
    [StatusLabel.DRAFT]: {title: 'Draft', class: 'draft'},
    [StatusLabel.ACTIVE]: {title: 'Active', class: 'active'},
    [StatusLabel.PENDING]: {title: 'Pending', class: 'pending'},
  };

  ngOnChanges(): void {
    this.statusConfig = this.config[this.status];
  }
}
