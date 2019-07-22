import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from "@angular/material";

@Component({
  selector: 'cl-audiences-vouchers-list',
  templateUrl: './audiences-vouchers-list.component.html',
  styleUrls: ['./audiences-vouchers-list.component.scss']
})
export class AudiencesVouchersListComponent implements AfterViewInit {
  DATE_FORMAT = 'dd MMM yyyy';
  TIME_FORMAT = 'hh:ssa';
  @Input() public dataSource: MatTableDataSource<Engagement>;
  @Input() public displayedColumns = ['rewardName', 'merchant', 'issuedDate', 'expiryDate', 'campaign', 'redemptionType', 'actions'];
  // @Input() public displayedColumns = ['rewardName', 'merchant', 'issuedDate', 'expiryDate', 'campaign'];
  @ViewChild(MatSort, {static: false}) private sort: MatSort;
  @Output() public itemAction = new EventEmitter();

  constructor() {
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    console.log('dataSource', this.dataSource);
  }

  public joinList(list: string[]) {
    return list.join(', ');
  }

  public changeExpiryDate(item: any) {
    this.itemAction.emit(item);
  }
}

