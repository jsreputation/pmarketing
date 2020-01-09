import { Component, AfterViewInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { CustomDataSource } from '@cl-shared/';
import { MatSort } from '@angular/material';

@Component({
  selector: 'cl-audiences-communications-list',
  templateUrl: './audiences-communications-list.component.html',
  styleUrls: ['./audiences-communications-list.component.scss']
})
export class AudiencesCommunicationsListComponent implements AfterViewInit {

  @Input() public dataSource: CustomDataSource<any>;
  @Input() public displayedColumns: string[] = [
    'message',
    'sendDate',
    'sender',
    'channel'
  ];
  @ViewChild(MatSort, { static: false }) private sort: MatSort;
  @Output() public clickChangeExpiryDate: EventEmitter<any> = new EventEmitter();

  public ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.registerSort(this.sort);
    }
  }
}
