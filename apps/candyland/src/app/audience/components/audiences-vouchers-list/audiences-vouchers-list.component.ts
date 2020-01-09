import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material';
import { CustomDataSource } from '@cl-shared';

@Component({
  selector: 'cl-audiences-vouchers-list',
  templateUrl: './audiences-vouchers-list.component.html',
  styleUrls: ['./audiences-vouchers-list.component.scss']
})
export class AudiencesVouchersListComponent implements AfterViewInit {
  public DATE_FORMAT: string = 'mediumDate';
  public TIME_FORMAT: string = 'shortTime';
  @Input() public dataSource: CustomDataSource<any>;
  @Input() public displayedColumns: string[] = [
    'rewardName',
    'status',
    'merchant',
    'issuedDate',
    'expiryDate',
    // 'campaign',
    'redemptionType',
    'actions'
  ];
  @ViewChild(MatSort, { static: false }) private sort: MatSort;
  @Output() public clickChangeExpiryDate: EventEmitter<any> = new EventEmitter();

  public ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.registerSort(this.sort);
    }
  }

  public changeExpiryDate(item: any): void {
    this.clickChangeExpiryDate.emit(item);
  }
}
