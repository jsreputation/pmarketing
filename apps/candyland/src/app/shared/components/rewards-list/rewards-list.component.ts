import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'cl-rewards-list',
  templateUrl: './rewards-list.component.html',
  styleUrls: ['./rewards-list.component.scss']
})
export class RewardsListComponent implements AfterViewInit {
  DATE_FORMAT = 'dd MMM yyyy';
  @Input() public dataSource: MatTableDataSource<Reward[]>;
  @Input() public displayedColumns = ['image', 'type', 'category', 'validity', 'balance', 'actions'];
  @Input() public selectable = false;
  @ViewChild(MatSort, {static: false}) private sort: MatSort;
  @Output() public itemAction = new EventEmitter();
  @Output() public selectReward = new EventEmitter<Reward>();


  public selected;

  constructor() {
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  public selectItem(item: Reward) {
    this.selected = item;
    this.selectReward.emit(item);
  }

  public isSelected(item: Reward): boolean {
    return this.selected && item.id === this.selected.id;
  }

  public editItem(id: number) {
    this.itemAction.emit(id);
  }

  public duplicateItem(id: number) {
    this.itemAction.emit(id);
  }

  public deleteItem(id: number) {
    this.itemAction.emit(id);
  }

  public useAsCaptionItem(id: number) {
    this.itemAction.emit(id);
  }

}
