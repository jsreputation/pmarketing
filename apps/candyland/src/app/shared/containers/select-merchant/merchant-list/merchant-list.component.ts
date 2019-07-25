import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'cl-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.scss']
})
export class MerchantListComponent implements OnInit, AfterViewInit {
  @Input() public dataSource: MatTableDataSource<IMerchant>;
  @Input() public displayedColumns = ['logo', 'name', 'phone', 'branches'];
  @ViewChild(MatSort, {static: false}) private sort: MatSort;
  @Output() selectedMerchant = new EventEmitter<IMerchant>();
  public selected: IMerchant;
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  public selectMerchant(item: IMerchant) {
    this.selected = item;
    this.selectedMerchant.emit(item);
  }

  public isSelected(item: IMerchant): boolean {
    return this.selected && item.id === this.selected.id;
  }

}
