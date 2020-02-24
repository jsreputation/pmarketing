import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material';
import { CustomDataSource } from '@cl-shared/table/data-source/custom-data-source';
import { IMerchantForm } from '@cl-core/models/merchant/merchant-form-interface';

@Component({
  selector: 'cl-list-merchant-view',
  templateUrl: './list-merchant-view.component.html',
  styleUrls: ['./list-merchant-view.component.scss']
})
export class ListMerchantViewComponent implements AfterViewInit {
  public DATE_FORMAT: string = 'mediumDate';
  @ViewChild(MatSort, { static: false }) private sort: MatSort;
  @Input() public dataSource: CustomDataSource<IMerchantForm>;
  @Input() public displayedColumns: string[] = ['logo', 'name', 'date', 'phone', 'branches', 'actions'];
  @Input() public selectable: boolean = false;
  @Output() public itemAction: EventEmitter<{ action: 'edit' | 'delete' | 'duplicate', merchant: IMerchantForm }>
  = new EventEmitter<{ action: 'edit' | 'delete' | 'duplicate', merchant: IMerchantForm }>();
  @Output() public selectedMerchant: EventEmitter<IMerchantForm> = new EventEmitter<IMerchantForm>();
  @Output() public clickDetail: EventEmitter<IMerchantForm> = new EventEmitter<IMerchantForm>();
  public selected: IMerchantForm;

  public ngAfterViewInit(): void {
    this.dataSource.registerSort(this.sort);
  }

  public isSelected(item: IMerchantForm): boolean {
    return this.selected && item.id === this.selected.id;
  }

  public selectItem(item: IMerchantForm): void {
    if (this.selectable) {
      this.selected = item;
      this.selectedMerchant.emit(item);
    }
  }

  public clickDetailItem(item: IMerchantForm): void {
    if (!this.selectable) {
      this.clickDetail.emit(item);
    }
  }

  public editItem(element: IMerchantForm): void {
    this.itemAction.emit({ action: 'edit', merchant: element });
  }

  public duplicateItem(element: IMerchantForm): void {
    this.itemAction.emit({ action: 'duplicate', merchant: element });
  }

  public deleteItem(element: IMerchantForm): void {
    this.itemAction.emit({ action: 'delete', merchant: element });
  }
}
