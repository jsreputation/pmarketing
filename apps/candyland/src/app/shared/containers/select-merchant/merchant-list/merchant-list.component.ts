import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'cl-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.scss']
})
export class MerchantListComponent implements OnInit, AfterViewInit {
  @Input() public dataSource: MatTableDataSource<IMerchant>;
  @Input() public displayedColumns = ['logo', 'name', 'phone', 'branches'];
  // @Input() public set data(val) {
  //   console.log('set val', val);
  //   // this.dataSource.data = val;
  // }
  @ViewChild(MatSort, {static: false}) private sort: MatSort;
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

}
