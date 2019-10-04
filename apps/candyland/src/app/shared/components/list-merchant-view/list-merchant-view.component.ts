import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material';
import { CustomDataSource } from '@cl-shared/table/data-source/custom-data-source';
import { Merchant } from '@cl-core/http-adapters/merchant';

@Component({
  selector: 'cl-list-merchant-view',
  templateUrl: './list-merchant-view.component.html',
  styleUrls: ['./list-merchant-view.component.scss']
})
export class ListMerchantViewComponent implements AfterViewInit {
  public DATE_FORMAT: string = 'mediumDate';
  @ViewChild(MatSort, { static: false }) private sort: MatSort;
  @Input() public dataSource: CustomDataSource<Merchant>;
  @Input() public displayedColumns: string[] = ['logo', 'name', 'date', 'phone', 'branches', 'actions'];
  @Input() public selectable: boolean = false;
  @Output() public itemAction: EventEmitter<{ action: 'edit' | 'delete' | 'duplicate', merchant: Merchant }>
    = new EventEmitter<{ action: 'edit' | 'delete' | 'duplicate', merchant: Merchant }>();
  @Output() public selectedMerchant: EventEmitter<Merchant> = new EventEmitter<Merchant>();
  @Output() public clickDetail: EventEmitter<Merchant> = new EventEmitter<Merchant>();
  public selected: Merchant;

  public ngAfterViewInit(): void {
    this.dataSource.registerSort(this.sort);
  }

  public isSelected(item: Merchant): boolean {
    return this.selected && item.id === this.selected.id;
  }

  public selectItem(item: Merchant): void {
    if (this.selectable) {
      this.selected = item;
      this.selectedMerchant.emit(item);
    }
  }

  public clickDetailItem(item: Merchant): void {
    if (!this.selectable) {
      this.clickDetail.emit(item);
    }
  }

  public editItem(element: Merchant): void {
    this.itemAction.emit({ action: 'edit', merchant: element });
  }

  public duplicateItem(element: Merchant): void {
    this.itemAction.emit({ action: 'duplicate', merchant: element });
  }

  public deleteItem(element: Merchant): void {
    this.itemAction.emit({ action: 'delete', merchant: element });
  }
}
