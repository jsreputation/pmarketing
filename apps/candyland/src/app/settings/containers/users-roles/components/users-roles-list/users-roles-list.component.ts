import {AfterViewInit, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'cl-users-roles-list',
  templateUrl: './users-roles-list.component.html',
  styleUrls: ['./users-roles-list.component.scss']
})
export class UsersRolesListComponent implements AfterViewInit {
  DATE_FORMAT = 'dd MMM yyyy';
  @Input() public dataSource: MatTableDataSource<any>;
  // @Input() public displayedColumns = ['image', 'type', 'category', 'validity', 'balance', 'actions'];
  @Input() public displayedColumns = ['name', 'role', 'invitedDate', 'actions'];
  @Input() public config: any;
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
