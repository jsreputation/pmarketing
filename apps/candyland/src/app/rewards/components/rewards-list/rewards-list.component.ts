import {AfterViewInit, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'cl-rewards-list',
  templateUrl: './rewards-list.component.html',
  styleUrls: ['./rewards-list.component.scss']
})
export class RewardsListComponent implements AfterViewInit {
  public DATE_FORMAT = 'dd MMM yyyy';
  @Input() public dataSource: MatTableDataSource<any>;
  @Input() public displayedColumns = ['image', 'type', 'category', 'validity', 'balance', 'actions'];
  @ViewChild(MatSort, {static: false}) private sort: MatSort;
  @Output() public itemAction = new EventEmitter();

  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  public editItem(id: number): void {
    this.itemAction.emit(id);
  }

  public duplicateItem(id: number): void {
    this.itemAction.emit(id);
  }

  public deleteItem(id: number): void {
    this.itemAction.emit(id);
  }

  public useAsCaptionItem(id: number): void {
    this.itemAction.emit(id);
  }

}
