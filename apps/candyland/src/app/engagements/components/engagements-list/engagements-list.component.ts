import { AfterViewInit, Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'cl-engagements-list',
  templateUrl: './engagements-list.component.html',
  styleUrls: ['./engagements-list.component.scss']
})
export class EngagementsListComponent implements AfterViewInit {
  @Input() public dataSource: MatTableDataSource<Engagement>;
  @Input() public displayedColumns = ['name', 'status', 'type', 'actions'];
  @ViewChild(MatSort, {static: false}) private sort: MatSort;
  @Output() public itemAction = new EventEmitter();

  constructor() {
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
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
