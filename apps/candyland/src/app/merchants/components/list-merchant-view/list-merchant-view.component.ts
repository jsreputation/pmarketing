import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'cl-list-merchant-view',
  templateUrl: './list-merchant-view.component.html',
  styleUrls: ['./list-merchant-view.component.scss']
})
export class ListMerchantViewComponent implements  AfterViewInit {
  @Input() public dataSource: MatTableDataSource<IMerchant>;
  @Input() public displayedColumns = ['logo', 'name', 'date', 'phone', 'branches', 'actions'];
  @ViewChild(MatSort, {static: false}) private sort: MatSort;
  @Output() public itemAction = new EventEmitter<{action: 'edit' | 'delete' | 'duplicate', merchant: IMerchant}>();
  public DATE_FORMAT = 'dd MMM yyyy';

  public ngAfterViewInit(): void {
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  public editItem(element: IMerchant): void {
    this.itemAction.emit({action: 'edit', merchant: element});
  }

  public duplicateItem(element: IMerchant): void {
    this.itemAction.emit({action: 'duplicate', merchant: element});
  }

  public deleteItem(element: IMerchant): void {
    this.itemAction.emit({action: 'delete', merchant: element});
  }
}
