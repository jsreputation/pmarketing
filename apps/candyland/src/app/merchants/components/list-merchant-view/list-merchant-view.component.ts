import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'cl-list-merchant-view',
  templateUrl: './list-merchant-view.component.html',
  styleUrls: ['./list-merchant-view.component.scss']
})
export class ListMerchantViewComponent implements OnInit, AfterViewInit {
  @Input() public dataSource: MatTableDataSource<IMerchant>;
  @Input() public displayedColumns = ['logo', 'name', 'phone', 'branches'];
  @ViewChild(MatSort, {static: false}) private sort: MatSort;
  @Output() selectedMerchant = new EventEmitter<IMerchant>();
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }
}
