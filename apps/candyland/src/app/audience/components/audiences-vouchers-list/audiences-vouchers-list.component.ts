import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'cl-audiences-vouchers-list',
  templateUrl: './audiences-vouchers-list.component.html',
  styleUrls: ['./audiences-vouchers-list.component.scss']
})
export class AudiencesVouchersListComponent implements AfterViewInit {
  public DATE_FORMAT = 'dd MMM yyyy';
  public TIME_FORMAT = 'hh:ssa';
  @Input() public dataSource: MatTableDataSource<any>;
  @Input() public displayedColumns = ['rewardName', 'merchant', 'issuedDate', 'expiryDate', 'campaign', 'redemptionType', 'actions'];
  @ViewChild(MatSort, {static: false}) private sort: MatSort;
  @Output() public clickChangeExpiryDate = new EventEmitter();

  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  public joinList(list: string[]): string {
    return list.join(', ');
  }

  public changeExpiryDate(item): void {
    this.clickChangeExpiryDate.emit(item);
  }
}
