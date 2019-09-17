import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material';
import { CustomDataSource } from '@cl-shared/table/data-source/custom-data-source';
import { Merchant } from '@cl-core/http-adapters/merchant';

@Component({
  selector: 'cl-list-merchant-view',
  templateUrl: './list-merchant-view.component.html',
  styleUrls: ['./list-merchant-view.component.scss']
})
export class ListMerchantViewComponent implements  AfterViewInit {
  @Input() public dataSource: CustomDataSource<Merchant>;
  @Input() public displayedColumns = ['logo', 'name', 'date', 'phone', 'branches', 'actions'];
  @ViewChild(MatSort, {static: false}) private sort: MatSort;
  @Output() public itemAction = new EventEmitter<{action: 'edit' | 'delete' | 'duplicate', merchant: IMerchant}>();
  public DATE_FORMAT = 'MMM dd, yyyy';

  public ngAfterViewInit(): void {
    this.dataSource.registerSort(this.sort);
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
